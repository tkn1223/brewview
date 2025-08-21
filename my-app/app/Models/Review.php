<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'shop_id',
        'user_id',
        'rating',
        'comment',
    ];

    // shopsテーブルとのリレーション    
    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    // usersテーブルとのリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // レビューを保存するメソッド
    public function saveReview($request)
    {
        if (!$request->shop_id) {
            throw new \Exception('shop_id is required');
        }

        $this->shop_id = $request->shop_id;
        $this->user_id = 1; // 仮でユーザーIDを1にしている
        $this->rating = $request->rating;
        $this->comment = $request->comment;
        $this->save();

        return $this;
    }

    // レビューの更新
    public function updateReview($request)
    {
        $review = $this->find($request->review_id);
        $review->rating = $request->rating;
        $review->comment = $request->comment;
        $review->save();

        return $review;
    }
}
