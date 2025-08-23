<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\User;
use App\Models\Review;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Nette\Utils\Random;
use Illuminate\Support\Facades\Auth;
use App\Models\ShopImage;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $status = request("status");

        $query = Shop::with('reviews')
        ->withCount('reviews')
        ->withAvg('reviews', 'rating');

        // 検索条件がある場合
        if($request->has('search')){
            $search = $request->search;
            $query->where('name', 'like', '%' . $search . '%')
                  ->orWhere('location', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%')
                  ->get();
        }

        $shops = $query->get();

        // 新着のレビューを5件取得
        $newReviews = Review::with('shop', 'user')
        ->orderBy('created_at', 'desc')
        ->take(5)
        ->get();


        return Inertia::render('Home', [
            'shops' => $shops,
            'newReviews' => $newReviews,
            'status' => $status,
        ]);
    }

    public function indexByUser($userId)
    {
        $user = User::find($userId);

        $shops = Shop::with('shopImages')
        ->where('created_by', $userId)->orWhere('updated_by', $userId)->get();
        return Inertia::render('Shop/IndexByUser', [
            'shops' => $shops,
            'user' => $user,
        ]);
    }

    public function detail($id)
    {
        // １つだけのデータ取得：find、すべてのデータ取得：get
        $shop = Shop::with('shopImages')->find($id);

        // クエリパラメータからステータスを取得
        $status = request("status");

        // 作成者と更新者のユーザーデータを取得
        $createdUser = User::find($shop->created_by);
        $updatedUser = User::find($shop->updated_by);

        $reviews = Review::with('user')
            ->where('shop_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Shop/Detail', [
            'shop' => $shop,
            'reviews' => $reviews,
            'status' => $status,
            'createdUser' => $createdUser,
            'updatedUser' => $updatedUser,
        ]);
    }

    public function create()
    {
        return Inertia::render('Shop/Create');
    }

    public function store(Request $request)
    {
        $status = "error";

        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string',
            'description' => 'required|string',
        ]);

        // バルク（まとめて一括保存）を使用することでDBへのアクセス数を減らすことができる
        // 今後のアップデート内容

        // トランザクションを開始
        DB::beginTransaction();
        try {
            $shopModel = new Shop();
            // 店舗を保存
            $shop = $shopModel->saveShop([
                'name' => $request->name,
                'location' => $request->location,
                'description' => $request->description,
                'created_by' => Auth::id(),
                'updated_by' => Auth::id(),
            ]);
            
            if($request -> file('images')){
                $images = $request->file('images');
                foreach($images as $image){
                    // 画像の拡張子を取得
                    $extention = $image->getClientOriginalExtension();
                    // 乱数作成
                    $random = Random::generate(16);
                    // 画像の名前を生成
                    $fileName = $shop->id . '_' . $random . '.' . $extention;

                    $shopImageModel = new ShopImage();
                    $shopImageModel->saveImage([
                        'shop_id' => $shop->id,
                        'file_name' => $fileName,
                        'file_path' => 'storage/shop_images/' . $fileName,
                        'file_type' => $image->getClientMimeType(),
                        'file_size' => $image->getSize(),
                        'file_extension' => $extention,
                        'file_mime' => $image->getClientMimeType(),
                        'file_original_name' => $image->getClientOriginalName(),
                        'file_original_path' => $image->getPathname(),
                        'file_original_type' => $image->getClientOriginalExtension(),
                    ]);
                    $image->storeAs('public/shop_images', $fileName);
                }
            }
            // ここまでの処理すべてをコミットする
            DB::commit();
            $status = 'shop-created';
        } catch(\Exception $e) {
            $message =$e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }
        return redirect()->route('shop.index', ['id' => $shop->id])
            ->with('success', '店舗を登録しました');
    }

    public function edit($id)
    {
        $shop = Shop::with('shopImages')->find($id);
        return Inertia::render('Shop/Edit', [
            'shop' => $shop,
        ]);
    }

    public function update(Request $request)
    {
        $status = "error";

        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string',
            'description' => 'required|string',
        ]);

        DB::beginTransaction();

        try{
            $ShopModel = new Shop();
            $shop = $ShopModel->updateShop([
                'id' => $request->id,
                'name' => $request->name,
                'location' => $request->location,
                'description' => $request->description,
                'updated_by' => Auth::id(),
            ]);

            // 既存の店舗画像を削除
            if($request->has('existingImages'))
            {
                // 既存の画像情報を取得
                $existingImages = $request->existingImages;
                // 既存の画像IDのみを取得
                $existingImageIds = array_column($existingImages, 'id');

                // DBに保存済みの画像IDを取得
                $arrayShopImageIds = DB::table('shop_images')->where('shop_id', $shop->id)->get(['id'])->toArray();
                // 配列のキーをidに変換
                $shopImageIds = array_column($arrayShopImageIds, 'id');

                // 既存の画像IDと新しい画像IDの差分を取得
                $deleteImageIds = array_diff($shopImageIds, $existingImageIds);

                if(count($deleteImageIds) > 0) {
                    DB::table('shop_images')->whereIn('id', $deleteImageIds)->delete();
                }
            }


            if($request -> file('images')){
                $images = $request->file('images');
                foreach($images as $image){
                    // 画像の拡張子を取得
                    $extention = $image->getClientOriginalExtension();
                    // 乱数作成
                    $random = Random::generate(16);
                    // 画像の名前を生成
                    $fileName = $shop->id . '_' . $random . '.' . $extention;

                    $shopImageModel = new ShopImage();
                    $shopImageModel->saveImage([
                        'shop_id' => $shop->id,
                        'file_name' => $fileName,
                        'file_path' => 'storage/shop_images/' . $fileName,
                        'file_type' => $image->getClientMimeType(),
                        'file_size' => $image->getSize(),
                        'file_extension' => $extention,
                        'file_mime' => $image->getClientMimeType(),
                        'file_original_name' => $image->getClientOriginalName(),
                        'file_original_path' => $image->getPathname(),
                        'file_original_type' => $image->getClientOriginalExtension(),
                    ]);
                    $image->storeAs('public/shop_images', $fileName);
                }
            }
            DB::commit();
            $status = 'shop-updated';

        } catch(\Exception $e) {
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }
        return redirect()->route('shop.detail', [
            'id' => $shop->id,
            'status' => $status,
        ]);
    }

    public function destroy($id)
    {
        $status = "error";
        $shop = Shop::find($id);

        DB::beginTransaction();

        try{
            // レビューを削除
            Review::where('shop_id', $id)->delete();
            // 店舗の画像を削除
            ShopImage::where('shop_id', $id)->delete();
            // 店舗を削除
            $shop->delete();

            DB::commit();
            $status = 'shop-deleted';
        } catch(\Exception $e) {
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }
        return redirect()->route('shop.index', ['status' => $status]);
    }
}
