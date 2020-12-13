<?php

namespace App\Problems\Models;
class Category{
  protected $name;
  protected $teams;
  protected $quantity_games;
  public function __construct(string $name){
    $this->name=$name;
    $this->teams=collect();
    $this->quantity_games=0;
  }
  public function name(){
    return $this->name;
  }
  public function teams(){
    return $this->teams;
  }
  public function quantityGames(){
    return $this->quantity_games;
  }
  public function win(){
    $win="EMPATE";
    $max=0;
    foreach($this->teams as $t){
      if($t->points() == $max){
        $win="EMPATE";
      }else{
        if($t->points() > $max){
          $max=$t->points();
          $win=$t->name();
        }
      }
    }
    
    return $win;
  }
  protected function winner($name1,$num1,$name2,$num2){
    return $num1>$num2?$name1:$name2;
  }
  protected function losser($name1,$num1,$name2,$num2){
    return $num1<$num2?$name1:$name2;
  }
  public function findTeam(string $team_name){
    return $this->teams->first(function($value,$key)use($team_name){
      return $value->name()===$team_name;
    });
  }
  public function addTeam(Team $t){
    $one=$this->findTeam($t->name());
    if($one==null){
      $this->teams->push($t);
      
    }
  }
  public function totalGamesToPlayers(){
    $count=$this->teams->count();
    return ($count-1)*$count;
  }
  public function game(string $name1,int $num1,string $name2,int $num2){
    $this->quantity_games++;
    $win=$this->winner($name1,$num1,$name2,$num2);
    $losser=$this->losser($name1,$num1,$name2,$num2);
    $this->teams->each(function($ele,$key)use($win,$losser){
      if($win===$ele->name()){
        $ele->addPoints(2);
        $ele->addGames(1);
      }
      if($losser===$ele->name()){
        $ele->addPoints(1);
        $ele->addGames(1);
      }
    });
  }
}