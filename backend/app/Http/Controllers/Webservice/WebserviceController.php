<?php

namespace App\Http\Controllers\Webservice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Curl;

class WebserviceController extends Controller
{
    public function cep(Request $request)
    {
        $cep = str_replace("-", "", $request->cep);
        $res = Curl::to('viacep.com.br/ws/' . $cep . '/json')->get();
        $response = json_decode($res);

        if (!$response) return response()->json([], 400);

        $data = (object) [
            'uf' => $response->uf,
            'zipCode' => $response->cep,
            'city' => $response->localidade
        ];

        return json_encode($data);
    }
}
