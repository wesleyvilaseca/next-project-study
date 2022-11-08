<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Casts\Json;

class Vehicle extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $fillable = [
        'user_id',    'zipCode',
        'city',
        'uf',
        'vehicle_type',
        'vehicle_brand',
        'vehicle_model',
        'vehicle_version',
        'vehicle_regdate',
        'vehicle_fuel',
        'vehicle_price',
        'vehicle_photos',
        'title',
        'description'
    ];

    protected $casts = [
        'vehicle_features' => Json::class,
        'vehicle_financial' => Json::class
    ];

    public function cover()
    {
        return $this->hasOne(Vehicle_photos::class, 'vehicle_id', 'id')->orderBy('order', 'ASC');
    }

    public function vehicle_brand()
    {
        return $this->hasOne(Vehicle_brand::class, 'value', 'vehicle_brand');
    }

    public function vehicle_model()
    {
        return Vehicle_model::where('value', $this->vehicle_model)->where('brand_id', $this->vehicle_brand)->first();
    }

    public function vehicle_version()
    {
        return Vehicle_version::where('value', $this->vehicle_version)
        ->where('brand_id', $this->vehicle_brand)
        ->where('model_id', $this->vehicle_model->value)
        ->first();
    }

    public function vehicle_color()
    {
        return $this->hasOne(Vehicle_carcolor::class, 'value', 'vehicle_color');
    }

    public function vehicle_fuel()
    {
        return $this->hasOne(Vehicle_fuel::class, 'value', 'vehicle_fuel');
    }

    public function vehicle_gearbox()
    {
        return $this->hasOne(Vehicle_gearbox::class, 'value', 'vehicle_gearbox');
    }

    public function vehicle_photos()
    {
        return $this->hasMany(Vehicle_photos::class, 'vehicle_id', 'id')->orderBy('order', 'ASC');
    }
}
