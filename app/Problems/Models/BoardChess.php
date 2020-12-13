<?php
namespace App\Problems\Models;
class BoardChess{
  protected $board;
  protected $obstacles;
  protected $queen;
  protected $obstacles_length;
  public function __construct(int $board,int $obstacles_length,Position $queen){
    $this->queen=$queen;
    $this->board=$board;
    $this->$obstacles_length=$obstacles_length;
    $this->obstacles=collect();
  }
  public function queen(){
    return $this->queen;
  }
  public function board(){
    return $this->board;
  }
  public function obstacles(){
    return $this->obstacles;
  }
  public function lengthObstacles(){
    return $this->obstacles_length;
  }
  public function addObstacle(Position $obs){
    $this->obstacles->push($obs);
  }
}