<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StringLoveController extends Controller
{
    protected $string;
    public function __construct(){
        $this->string = app(\App\Problems\Events\StringLoveProblem::class);
    }
    public function index(Request $request){
        dd($this->string->setter($request->input3)->play()->solved());
    }
}
