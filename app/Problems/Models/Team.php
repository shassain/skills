<?php

namespace App\Problems\Models;
class Team{
  protected $name;
  protected $points;
  protected $games;
  public function __construct(string $name){
    $this->name=$name;
    $this->points=0;
    $this->games=0;
  }
  public function name(){
    return $this->name;
  }
  public function points():int{
    return $this->points;
  }
  public function games():int{
    return $this->games;
  }
  public function addPoints(int $p){
    $this->points+=$p;
  }
  public function addGames(int $g){
    $this->games+=$g;
  }
}