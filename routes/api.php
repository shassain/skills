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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post("problem-1","PaddleController@index")->name("api.problem1");
Route::post("problem-2","ChessController@index")->name("api.problem2");
Route::post("problem-3","StringLoveController@index")->name("api.problem3");