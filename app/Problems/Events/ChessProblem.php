<?php

namespace App\Problems\Events;

use App\Problems\Interfaces\IProblem;
use App\Problems\Models\Position;
use App\Problems\Models\BoardChess;
use Illuminate\Support\Collection;
class ChessProblem implements IProblem{
  protected $chess;
  protected $games;
  protected $datas;
  public function __construct(){
    $this->chess=null;
    $this->datas=collect();
  }
  public function setter(string $str){
    $this->datas=collect(explode("\n",$str));
    $this->datas=$this->datas->map(function($value){
      return explode(" ",trim($value));
    });
    return $this;
  }
  public function play(){
    [$n,$k]=$this->datas[0];
    [$rq,$cq]=$this->datas[1];
    $obstacles=$this->datas->filter(function($ele,$key)use ($k){
      return $key>1 && $key <= 1 + $k;
    });
    $this->queensAttack($n,$k ,$rq, $cq, $obstacles);
    return $this;
  }
  public function queensAttack(int $n,int $k,int $rq,int $cq,Collection $obstacles){
    $queen=new Position($rq,$cq);
    $chess=new BoardChess($n,$k,$queen);
    $obstacles->each(function($ele,$key)use($chess){
      $chess->addObstacle(new Position($ele[0],$ele[1]));
    });
    $this->chess=$chess;
  }
  
  public function solved(){
    $mov=0;
    $limit=$this->chess->board();
    $y=$this->chess->queen()->y();
    $x=$this->chess->queen()->x();

    for($xx = $x-1; $xx >= 1; $xx--){
      $first=$this->chess->obstacles()->first(function($ele,$key)use($xx,$y){
        return $ele->x()==$xx && $ele->y()==$y;
      });
      if($first!=null){
        break;
      }
      $mov++;
    }
    for($xx=$x-1,$yy=$y-1;$xx>=1 && $yy>=1 ;$xx--,$yy--){
      $first=$this->chess->obstacles()->first(function($ele,$key)use($xx,$yy){
        return $ele->x()==$xx && $ele->y()==$yy;
      });
      if($first!=null){
        break;
      }
      $mov++;
    }
    for($xx=$x-1,$yy=$y+1;$xx>=1 && $yy<=$limit ;$xx--,$yy++){
      $first=$this->chess->obstacles()->first(function($ele,$key)use($xx,$yy){
        return $ele->x()==$xx && $ele->y()==$yy;
      });
      if($first!=null){
        break;
      }
      $mov++;
    }
    
    for($xx=$x+1;$xx<=$limit ;$xx++){
      $first=$this->chess->obstacles()->first(function($ele,$key)use($xx,$y){
        return $ele->x()==$xx && $ele->y()==$y;
      });
      if($first!=null){
        break;
      }
      $mov++;
    }
    for($xx=$x+1,$yy=$y-1;$xx<=$limit && $yy>=1 ;$xx++,$yy--){
      $first=$this->chess->obstacles()->first(function($ele,$key)use($xx,$yy){
        return $ele->x()==$xx && $ele->y()==$yy;
      });
      if($first!=null){
        break;
      }
      $mov++;
    }
    for($xx=$x+1,$yy=$y+1;$xx<=$limit && $yy<=$limit ;$xx++,$yy++){
      $first=$this->chess->obstacles()->first(function($ele,$key)use($xx,$yy){
        return $ele->x()==$xx && $ele->y()==$yy;
      });
      if($first!=null){
        break;
      }
      $mov++;
    }
    for($yy=$y+1;$yy<=$limit ;$yy++){
      $first=$this->chess->obstacles()->first(function($ele,$key)use($x,$yy){
        return $ele->x()==$x && $ele->y()==$yy;
      });
      if($first!=null){
        break;
      }
      $mov++;
    }
    for($yy=$y-1;$yy>=1 ;$yy--){
      $first=$this->chess->obstacles()->first(function($ele,$key)use($x,$yy){
        return $ele->x()==$x && $ele->y()==$yy;
      });
      if($first!=null){
        break;
      }
      $mov++;
    }
    return ["attack"=>$mov]; 
  }
}