<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CurrencyModel;

class PageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
	public function index(){
		return view("page.home");
	}

	public function converter(){
		return view("page.converter");
	}

}
