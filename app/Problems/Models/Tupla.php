<?php
namespace App\Problems\Models;

class Tupla{
  protected $originalIndex;
  protected $firstHalf;
  protected $secondHalf;
  public function __construct(int $originalIndex,int $firstHalf,int $secondHalf){
    $this->originalIndex=$originalIndex;
    $this->firstHalf=$firstHalf;
    $this->secondHalf=$secondHalf;
  }
  public function originalIndex(){
    return $this->originalIndex;
  }
  public function setOriginalIndex(int $originalIndex){
    $this->originalIndex=$originalIndex;
  }
  public function firstHalf(){
    return $this->firstHalf;
  }
  public function setFirstHalf(int $firstHalf){
    $this->firstHalf=$firstHalf;
  }
  public function secondHalf()
  {
    return $this->secondHalf;
  }
  public function setSecondHalf(int $var)
  {
    $this->secondHalf=$var;
  }
}