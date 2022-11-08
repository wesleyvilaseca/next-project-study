<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VehicleUpdateRequest;
use App\Models\Vehicle;
use App\Models\Vehicle_brand;
use App\Models\Vehicle_car_steering;
use App\Models\Vehicle_carcolor;
use App\Models\Vehicle_cubiccms;
use App\Models\Vehicle_door;
use App\Models\Vehicle_exchange;
use App\Models\Vehicle_features;
use App\Models\Vehicle_financial;
use App\Models\Vehicle_fuel;
use App\Models\Vehicle_gearbox;
use App\Models\Vehicle_model;
use App\Models\Vehicle_motorpower;
use App\Models\Vehicle_regdate;
use App\Models\Vehicle_type;
use App\Models\Vehicle_version;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class VehiclesController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth()->guard('api')->user();
    }

    private function getData()
    {
        return [
            'types' => Vehicle_type::all(),
            'regdate' => Vehicle_regdate::orderBy('label', 'ASC')->get(),
            'gearbox' => Vehicle_gearbox::all(),
            'fuel' => Vehicle_fuel::all(),
            'car_steering' => Vehicle_car_steering::all(),
            'motor_power' => Vehicle_motorpower::all(),
            'doors' => Vehicle_door::all(),
            'features' => Vehicle_features::all(),
            'carcolor' => Vehicle_carcolor::all(),
            'exchange' => Vehicle_exchange::all(),
            'financial' => Vehicle_financial::all(),
            'cubccms' => Vehicle_cubiccms::all()
        ];
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehicles = Vehicle::where('user_id', $this->user->id)
            ->where('status', 1)
            ->with(['cover', 'vehicle_brand', 'vehicle_fuel', 'vehicle_color', 'vehicle_gearbox'])
            ->paginate(12);

        $vehicles->transform(function ($vehicle) {
            $vehicle->vehicle_model = $vehicle->vehicle_model();
            if(@$vehicle->version) $vehicle->version = $vehicle->vehicle_version();

            return $vehicle;
        });

        return compact('vehicles');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vehicle = Vehicle::with('vehicle_photos')
            ->firstOrCreate([
                'user_id' => $this->user->id,
                'status' => 0
            ]);

        $vehicle = $vehicle->fresh('vehicle_photos');

        return array_merge(['vehicle' => $vehicle], $this->getData());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(VehicleUpdateRequest $request, $id)
    {
        $vehicle = Vehicle::where('user_id', $this->user->id)->find($id);
        $vehicle_price = (float) str_replace("R$ ", "", $request->vehicle_price);

        if (!$vehicle) return response()->json(['error' => 'operação não autorizada'], 400);

        $vehicle->fill($request->except(['vehicle_photos', 'vehicle_version']));
        $vehicle->status = 1;
        $vehicle->uf_url = $request->uf;
        $vehicle->city_url = $request->city;
        $vehicle->vehicle_price = $vehicle_price;

        $res = $vehicle->update();

        if (!$res)  return response()->json(['error' => 'operação ao salvar o veiculo'], 400);

        return response()->json(['success' => 'Dados atualizados com sucesso'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function brand($vehicle_type)
    {
        $vehicle_brand = Vehicle_brand::where('vehicle_type_id', $vehicle_type)->get();
        return compact('vehicle_brand');
    }

    public function model($vehicle_type, $vehicle_brand)
    {
        $vehicle_model = Vehicle_model::where('vehicle_type_id', $vehicle_type)
            ->where('brand_id', $vehicle_brand)
            ->orderBy('label')
            ->get();

        return compact('vehicle_model');
    }

    public function version($vehicle_brand, $vehicle_model)
    {
        $vehicle_version = Vehicle_version::where('brand_id', $vehicle_brand)
            ->where('model_id', $vehicle_model)
            ->orderBy('label')
            ->get();

        return compact('vehicle_version');
    }
}
