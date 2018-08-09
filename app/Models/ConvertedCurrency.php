<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Model;
use App\Models\CurrencyModel;

class ConvertedCurrency extends Model
{
    protected $table = "converted_currency";

    public function converted()
    {
        return $this->belongsTo('App\Models\CurrencyModel', 'currency_id', 'id');
    }
}
