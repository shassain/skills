<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    public function download($nombre){
        $public_path=public_path();
        $url = $public_path.'/docs/'.$nombre;
        if(\Storage::exists('/docs/'.$nombre)){
            return response()->download($url);
        }
        abort(404);
    }
}
