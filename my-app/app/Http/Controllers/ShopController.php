<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Review;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        // $shops = Shop::all();
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
        ]);
    }

    public function detail($id)
    {
        // １つだけのデータ取得：find、すべてのデータ取得：get
        $shop = Shop::find($id);

        $reviews = Review::with('user')
            ->where('shop_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Shop/Detail', [
            'shop' => $shop,
            'reviews' => $reviews,
        ]);
    }
}
