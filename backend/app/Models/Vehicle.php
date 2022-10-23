<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Casts\Json;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = ['user_id'];

    protected $casts = [
        'vehicle_features' => Json::class,
        'vehicle_financial' => Json::class
    ];

    public function vehicle_photos()
    {
        return $this->hasMany(Vehicle_photos::class, 'vehicle_id', 'id')->orderBy('order', 'ASC');
    }
}
