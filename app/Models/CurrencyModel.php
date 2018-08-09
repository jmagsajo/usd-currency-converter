<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Model;

class CurrencyModel extends Model
{
    protected $table = "currency";

    public static function getCurrencies(){
    	return CurrencyModel::select('targetName', 'targetCurrency', 'exchangeRate')->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') = curdate()")->get();
    }

    public static function getCurrencyCount(){
    	return CurrencyModel::whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') = curdate()")->count();
    }

    public static function getCurrency($title){
		return CurrencyModel::where('title', '=', $title)->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') = curdate()")->first();
    }

    public static function getCodes($date){
        return CurrencyModel::select('id','targetCurrency')->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') = '$date'")->get();
    }

    public static function getCurrencyById($id){
        return CurrencyModel::where('id', $id)->first();
    }
}
