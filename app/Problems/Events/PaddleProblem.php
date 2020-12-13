<?php

namespace App\Problems\Events;

use App\Problems\Interfaces\IProblem;
use App\Problems\Models\Category;
use App\Problems\Models\Team;
class PaddleProblem implements IProblem{
  protected $categories;
  protected $datas;
  protected $games;
  public function __construct(){
    $this->datas=collect();
    $this->categories=collect();
    $this->games=[];
  }
  public function setter(string $str){
    $this->datas=collect(explode("\n",$str));
    $this->datas=$this->datas->map(function($value){
      return trim($value);
    });
    return $this;
  }
  public function play(){
    $team=[];
    $c="";
    $boolean=false;
    foreach($this->datas as $ele){
      if($ele!="FIN"){
        if(!$boolean){
          $boolean=true;
          $c=new Category($ele);
        }
        else{
          [$team1,$num1,$team2,$num2]=explode(" ",$ele);
          $c->addTeam(new Team($team1));
          $c->addTeam(new Team($team2));
          $c->game($team1,$num1,$team2,$num2);
        }
      }else{
        $this->categories->push($c);
        $boolean=false;
      }
    }
    return $this;
  }
  public function solved(){
    $resp=$this->categories->map(function($ele,$key){
      return [
        "category"=>$ele->name(),
        "win"=>$ele->win(),
        "missing_games"=>$ele->totalGamesToPlayers()-$ele->quantityGames()
      ];
    });
    return $resp;
  }
}