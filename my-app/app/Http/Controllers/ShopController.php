<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Review;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Nette\Utils\Random;
use Illuminate\Support\Facades\Auth;
use App\Models\ShopImage;

class ShopController extends Controller
{
    public function index()
    {
        $status = request("status");

        $shops = Shop::with('reviews')->get();
        // dd($shops); デバックのコマンド

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

    public function detail($id)
    {
        // １つだけのデータ取得：find、すべてのデータ取得：get
        $shop = Shop::with('shopImages')->find($id);

        // クエリパラメータからステータスを取得
        $status = request("status");

        $reviews = Review::with('user')
            ->where('shop_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Shop/Detail', [
            'shop' => $shop,
            'reviews' => $reviews,
            'status' => $status,
        ]);
    }

    public function create()
    {
        return Inertia::render('Shop/Create');
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }

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
                'created_by' => $user->id,
                'updated_by' => $user->id,
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
}
