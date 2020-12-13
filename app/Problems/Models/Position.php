<?php
namespace App\Problems\Models;
class Position{
  protected $x;
  protected $y;
  public function __construct(int $x,int $y){
    $this->x=$x;
    $this->y=$y;
  }
  public function x(){
    return $this->x;
  }
  public function y(){
    return $this->y;
  }
}