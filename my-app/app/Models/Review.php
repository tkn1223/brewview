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
    public function saveReview($data)
    {
        if (!$data['shop_id']) {
            throw new \Exception('shop_id is required');
        }

        $this->shop_id = $data['shop_id'];
        $this->user_id = $data['user_id'];
        $this->rating = $data['rating'];
        $this->comment = $data['comment'];
        $this->save();

        return $this;
    }

    // レビューの更新
    public function updateReview($request)
    {
        dd($request->all());
        $review = $this->find($request->review_id);
        $review->rating = $request->rating;
        $review->comment = $request->comment;
        $review->save();

        return $review;
    }
}
