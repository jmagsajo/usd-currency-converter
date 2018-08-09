<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use App\User;
use App\Models\ConvertedCurrency;

class ApiController extends Controller
{
    public function getToken(Request $request){

		$http = new Client;
		
	    $response = $http->post(url('oauth/token'), [
	        'form_params' => [
		        'grant_type' => 'client_credentials',
		        'client_id' => 2,
		        'client_secret' => 'UuGtboYPdwafM2294gHg34HA2xwqCCmDbwIbWbb8',
		        'scope' => '',
		    ],
	    ]);

	    return $response;
	}

	public function postDemo(Request $request){
		$data = [];
		$converted_amounts = ConvertedCurrency::all();

		foreach($converted_amounts as $c){
			$computation = (float)$c->amount * (float)$c->converted->exchangeRate;
    		$computation = number_format($computation, 2);

			$push = [
				'usd_amount' => $c->amount,
				'target_currency' => $c->converted->targetCurrency,
				'target_currency' => $c->converted->exchangeRate,
				'converted_amount' => $computation,
				'created_at' => $c->created_at,
			];

			array_push($data, $push);
		}
		
    	return response()->json([
			'status' => 1,
            'data' => $data,
        ], 201);

    }
}
