<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'v1'
], function () {
	Route::get('getToken', 'API\ApiController@getToken');

	Route::group([
      'middleware' => 'auth:api'
    ], function() {
	    Route::get('update-currency', 'API\CurrencyController@updateCurrency');
	  	Route::get('get-currency', 'API\CurrencyController@getCurrency');
	  	Route::post('fetch-codes', 'API\CurrencyController@getCodes');
	  	Route::post('compute', 'API\CurrencyController@computeCurrency');
	});
});