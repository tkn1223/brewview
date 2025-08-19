<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShopImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'file_extension',
        'file_mime',
        'file_original_name',
        'file_original_path',
        'file_original_type',
        'thumbnail_id',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function saveImage($data)
    {
        $this->shop_id = $data['shop_id'];
        $this->file_name = $data['file_name'];
        $this->file_path = $data['file_path'];
        $this->file_type = $data['file_type'];
        $this->file_size = $data['file_size'];
        $this->file_extension = $data['file_extension'];
        $this->file_mime = $data['file_mime'];
        $this->file_original_name = $data['file_original_name'];
        $this->file_original_path = $data['file_original_path'];
        $this->file_original_type = $data['file_original_type'];
        $this->save();
        return $this;
    }

}
