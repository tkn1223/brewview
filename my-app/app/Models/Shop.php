<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shop extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'location',
        'description',
        'created_by',
        'updated_by',
    ];

    // reviewsテーブルとのリレーション
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // reviewsテーブルの中のuser_idとusersテーブルのidを紐づける
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // shop_imagesテーブルとのリレーション
    public function shopImages()
    {
        return $this->hasMany(ShopImage::class);
    }

    public function saveShop($data)
    {
        $this->name = $data['name'];
        $this->location = $data['location'];
        $this->description = $data['description'];
        $this->created_by = $data['created_by'];
        $this->updated_by = $data['updated_by'];
        $this->save();

        return $this;
    }
}
