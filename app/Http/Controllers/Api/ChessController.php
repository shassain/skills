<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChessController extends Controller
{
    /**
     * @var \App\Problems\Events\ChessProblem::class
     */
    protected $chess;
    public function __construct(){
        $this->chess = app(\App\Problems\Events\ChessProblem::class);
    }
    public function index(Request $request){
        return response()->json($this->chess->setter($request->input2)->play()->solved());
    }
}
