<?php

namespace App\Http\Controllers\API;

use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use App\Models\CurrencyModel;
use App\Models\ConvertedCurrency;

class CurrencyController extends Controller
{	
	public function getCurrency(){

		$return = CurrencyModel::getCurrencies();

		return response()->json([
            'status' => 1,
            'data' => $return,
        ], 201);
	}

    public function updateCurrency(Request $request){
    	$return = [];
    	$url = 'http://www.floatrates.com/daily/usd.xml';
		$xml = simplexml_load_file($url);

    	$checkCurrencyByDate = CurrencyModel::getCurrencyCount();

		if($xml && $checkCurrencyByDate <= 0){
			
			$data = [];
			foreach($xml->item as $item){
				$data[] = [
					"title" => $item->title,
				    "link" => $item->link,
				    "description" => $item->description,
				    "pubDate" => $item->pubDate,
				    "baseCurrency" => $item->baseCurrency,
				    "baseName" => $item->baseName,
				    "targetCurrency" => $item->targetCurrency,
				    "targetName" => $item->targetName,
				    "exchangeRate" => $item->exchangeRate,
				    "inverseRate" => $item->inverseRate,
				    "inverseDescription" => $item->inverseDescription,
				    "created_at" => DB::raw("NOW()")
				];
			}

			/*batch insert*/
			CurrencyModel::insert($data);
		}else{
			foreach($xml->item as $item){
				$currency = CurrencyModel::getCurrency($item->title);
				if($currency){
					$currency->title = $item->title;
				    $currency->link = $item->link;
				    $currency->description = $item->description;
				    $currency->pubDate = $item->pubDate;
				    $currency->baseCurrency = $item->baseCurrency;
				    $currency->baseName = $item->baseName;
				    $currency->targetCurrency = $item->targetCurrency;
				    $currency->targetName = $item->targetName;
				    $currency->exchangeRate = $item->exchangeRate;
				    $currency->inverseRate = $item->inverseRate;
				    $currency->inverseDescription = $item->inverseDescription;
				    $currency->save();
			    }else{
			    	$currency = new CurrencyModel();
			    	$currency->title = $item->title;
				    $currency->link = $item->link;
				    $currency->description = $item->description;
				    $currency->pubDate = $item->pubDate;
				    $currency->baseCurrency = $item->baseCurrency;
				    $currency->baseName = $item->baseName;
				    $currency->targetCurrency = $item->targetCurrency;
				    $currency->targetName = $item->targetName;
				    $currency->exchangeRate = $item->exchangeRate;
				    $currency->inverseRate = $item->inverseRate;
				    $currency->inverseDescription = $item->inverseDescription;
				    $currency->save();
			    }
			}	
		}

		$return = CurrencyModel::getCurrencies();

		return response()->json([
			'status' => 1,
            'message' => 'Currency Updated!',
            'data' => $return,
        ], 201);
	
    }

    public function getCodes(Request $request){

    	$date = $request->date;
    	$return = CurrencyModel::getCodes($date);

    	return response()->json([
			'status' => 1,
            'data' => $return,
            'dataCount' => count($return)
        ], 201);
    }

    public function computeCurrency(Request $request){

    	$amount = $request->amount;
    	$code_id = $request->code_id;
    	$code = CurrencyModel::getCurrencyById($code_id);

    	$computation = (float)$amount * (float)$code->exchangeRate;
    	$computation = number_format($computation, 2);

    	$converted_currency = new ConvertedCurrency();
    	$converted_currency->currency_id = $code_id;
    	$converted_currency->amount = $amount;
    	$converted_currency->save();

    	return response()->json([
			'status' => 1,
            'data' => $computation,
            'code' => $code->targetCurrency,
            'converted_currency' => $converted_currency
        ], 201);
    }

}
