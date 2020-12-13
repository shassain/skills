<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaddleController extends Controller
{
    /**
     * @var \App\Problems\Events\PaddleProblem::class
     */
    protected $games;
    public function __construct(){
        $this->games = app(\App\Problems\Events\PaddleProblem::class);
    }
    public function index(Request $request){
        return response()->json($this->games->setter($request->input1)->play()->solved());
    }
}
