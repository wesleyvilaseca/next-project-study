<?php

use App\Http\Controllers\Api\Uploads\VehicleUploadController;
use App\Http\Controllers\Api\VehiclesController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Webservice\WebserviceController;
use App\Http\Controllers\ImageController;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/thumb/{path}/{img}', [ImageController::class, 'thumb']);
Route::post('/register', [AuthController::class, 'store']);

Route::apiResources([
    'vehicles' => VehiclesController::class
]);

Route::group(['prefix' => 'upload'], function () {
    Route::resource('vehicle', VehicleUploadController::class)->only(['store', 'update', 'destroy']);
});

Route::get('vehicles/{vehicle_type}/brand', [VehiclesController::class, 'brand']);
Route::get('vehicles/{vehicle_type}/{vehicle_brand}/model', [VehiclesController::class, 'model']);
Route::get('vehicles/{vehicle_brand}/{vehicle_model}/version', [VehiclesController::class, 'version']);

Route::group(['prefix' => 'webservice'], function () {
    Route::post('/cep', [WebserviceController::class, 'cep']);
});
