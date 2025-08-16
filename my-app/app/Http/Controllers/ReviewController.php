<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Inertia\Inertia;
use App\Models\Shop;

class ReviewController extends Controller
{
    public function create($id)
    {
        $shop = Shop::find($id);
        return Inertia::render('Review/Create', [
            'shop' => $shop,
        ]);
    }

    // 保存するときの一般的なメソッド名
    public function store(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:255',
        ]);

        $reviewModel = new Review();
        $review = $reviewModel->saveReview($request);

        return redirect()->route('shop.detail', ['id' => $request->shop_id]);
    }
}
