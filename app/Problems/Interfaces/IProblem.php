<?php

namespace App\Problems\Interfaces;

interface IProblem{
    public function setter(string $srt);
    public function solved();
    public function play();
}