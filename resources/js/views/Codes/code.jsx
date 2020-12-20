
export const codes = {
  paddle: {
    Controller: `<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaddleController extends Controller
{
    /**
     * @var \App\Problems\Events\PaddleProblem::class
     */
    protected $games;
    public function __construct(){
        $this->games = app(\App\Problems\Events\PaddleProblem::class);
    }
    public function index(Request $request){
        return response()->json($this->games->setter($request->input1)->play()->solved());
    }
}
`,
    Model: `
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
      //la cantidad de partidas depende de la cantidad
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
//model team

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
    `,
    Problem: `
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
    `
  },
  chess: {
    Controller: `
    <?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChessController extends Controller
{
    /**
     * @var \App\Problems\Events\ChessProblem::class
     */
    protected $chess;
    public function __construct(){
        $this->chess = app(\App\Problems\Events\ChessProblem::class);
    }
    public function index(Request $request){
        return response()->json($this->chess->setter($request->input2)->play()->solved());
    }
}

    `,
    Model: `
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
    `,
    Problem: `
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
  private function obstacleExists($x,$y,$obstacles):bool{
    $first=$obstacles->first(function($ele,$key)use($x,$y){
      return $ele->x()==$x && $ele->y()==$y;
    });
    if($first!=null){
      return true;
    }
    return false;
  } 
  public function solved(){
    $mov=0;
    $limit=$this->chess->board();
    $y=$this->chess->queen()->y();
    $x=$this->chess->queen()->x();

    for($xx = $x-1; $xx >= 1; $xx--){
      if($this->obstacleExists($xx,$y,$this->chess->obstacles())){
        break;
      }
      $mov++;
    }
    for($xx=$x-1,$yy=$y-1;$xx>=1 && $yy>=1 ;$xx--,$yy--){
      if($this->obstacleExists($xx,$yy,$this->chess->obstacles())){
        break;
      }
      $mov++;
    }
    for($xx=$x-1,$yy=$y+1;$xx>=1 && $yy<=$limit ;$xx--,$yy++){
      if($this->obstacleExists($xx,$yy,$this->chess->obstacles())){
        break;
      }
      $mov++;
    }
    
    for($xx=$x+1;$xx<=$limit ;$xx++){
      if($this->obstacleExists($xx,$y,$this->chess->obstacles())){
        break;
      }
      $mov++;
    }
    for($xx=$x+1,$yy=$y-1;$xx<=$limit && $yy>=1 ;$xx++,$yy--){
      if($this->obstacleExists($xx,$yy,$this->chess->obstacles())){
        break;
      }
      $mov++;
    }
    for($xx=$x+1,$yy=$y+1;$xx<=$limit && $yy<=$limit ;$xx++,$yy++){
      if($this->obstacleExists($xx,$yy,$this->chess->obstacles())){
        break;
      }
      $mov++;
    }
    for($yy=$y+1;$yy<=$limit ;$yy++){
      if($this->obstacleExists($x,$yy,$this->chess->obstacles())){
        break;
      }
      $mov++;
    }
    for($yy=$y-1;$yy>=1 ;$yy--){
      if($this->obstacleExists($x,$yy,$this->chess->obstacles())){
        break;
      }
      $mov++;
    }
    return ["attack"=>$mov]; 
  }
}
      `
  },
  strings: {
    Controller: `
    <?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StringLoveController extends Controller
{
    protected $string;
    public function __construct(){
        $this->string = app(\App\Problems\Events\StringLoveProblem::class);
    }
    public function index(Request $request){
        return response()->json($this->string->setter($request->input3)->play()->solved());
    }
}

    `,
    Model: `
    //model no exist
    `,
    Problem: `
      <?php

namespace App\Problems\Events;

use App\Problems\Interfaces\IProblem;
use App\Problems\Models\Tupla;
class StringLoveProblem implements IProblem{
  protected $he;
  protected $su;
  protected $best;
  protected $str;
  protected $len;
  public function __construct(){
    $this->su=[];
    $this->he=[];
    $this->best=0;
    $this->len=0;
  }
  public function setter(string $str){
    $this->len=strlen($str);
    $this->su=$this->SuffixArray($this->len,$str);
    $this->he=$this->kasai($str,$this->su);
    $this->he[$this->len] = 0;
    $this->best = $this->len;
    $this->str=$str;
    return $this;
  }
  public function solved(){
    return ["best"=>$this->best];
  }
  public function play(){
    $top=0;
    $st=[];
    $st[$top++] = 0;
    for ($i = 1; $i < $this->len + 1; $i++)
    {
      //cout << height[i] << " ";
      while ($top != 0 && $this->he[$i] < $this->he[$st[$top - 1]])
      {
        $val = $this->he[$st[$top - 1]];
        $top--;
        $this->best = max($this->best, $val * ($top == 0 ? $i : $i - $st[$top - 1]));
      }

      if ($top == 0 || $this->he[$i] >= $this->he[$st[$top - 1]])
        $st[$top++] = $i;
    }
    return $this;
  }
  public function kasai(string $s, $suffix_array){
    $n=strlen($s);
    $k=0;
    $lcp=collect();
    $rank=collect();
    for($i=0; $i<$n; $i++){
      $rank->push(0);
      $lcp->push(0);
    }
    for($i=0; $i<$n; $i++){
      $rank[$suffix_array[$i]]=$i;
    }
    for($i=0; $i<$n; $i++, $k?$k--:0)
    {
        if($rank[$i]==$n-1) {$k=0; continue;}
        $j=$suffix_array[$rank[$i]+1];
        while($i+$k<$n && $j+$k<$n && $s[$i+$k]==$s[$j+$k]) $k++;
        $lcp[$rank[$i]]=$k;
    }
    return $lcp;
  }
  function toNumber($dest)
  {
      if ($dest)
          return ord(strtolower($dest)) - 96;
      else
          return 0;
  }
  public function Suffix(string $s){
    
    $N = strlen($s);
    $split=\str_split($s);
    $suffixRank=[];
    for($i=0;$i<30;$i++){
      $suffixRank[$i]=[];
      for($j = 0; $j < $N; $j++){
        $suffixRank[$i][$j]=0;
      }
    }
    $myTuple=collect();
    
    for($i = 0; $i < $N; ++$i){
      $suffixRank[0][$i] = $this->toNumber($s[$i]);
      $myTuple->push(new Tupla(0,0,0));
    }
    $stp=0;
    for($cnt = 1, $stp = 1; $cnt < $N; $cnt *= 2, ++$stp) {

        for($i = 0; $i < $N; ++$i) {
            $myTuple[$i]->setFirstHalf($suffixRank[$stp - 1][$i]);
            $myTuple[$i]->setSecondHalf($i + $cnt < $N ? $suffixRank[$stp - 1][$i + $cnt] : -1);
            $myTuple[$i]->setOriginalIndex($i);
        }

        $myTuple=$myTuple->sortBy(function($c,$key){
          return $c->firstHalf();
        });
        
        $suffixRank[$stp][$myTuple[0]->originalIndex()] = 0;

        for($i = 1, $currRank = 0; $i < $N; ++$i) {
            if($myTuple[$i - 1]->firstHalf() != $myTuple[$i]->firstHalf() || $myTuple[$i - 1]->secondHalf() != $myTuple[$i]->secondHalf())
                ++$currRank;
            $suffixRank[$stp][$myTuple[$i]->originalIndex()] = $currRank;
        }
    }
    $resp=[];
    foreach($myTuple as $t){
      array_push($resp,$t->originalIndex());
    }
    return $resp;
  }
  public function SuffixArray(int $length,string $str)
  {
      $j=0; $k=0; $h=0;
      $split=str_split($str);
      asort($split);
      $split=collect($split);
      $originalKeys=collect();
      $br=collect();
      $split->each(function($value,$key)use($originalKeys,$br){
          $originalKeys->push($key);
          $br->push(0);
      });
      $originalKeys->each(function($value,$key)use($split,$originalKeys,$br){
          $br[$value]=($key == 0 || $split[$value] != $split[$originalKeys[$key - 1]])
                          ?
                          $key
                          :
                          $br[$originalKeys[$key - 1]];
      });        
      for ($h = 1; $h < $length; $h *=2)
      {
          $seconds=[];
          $first=[];
          for ($i = 0; $i < $length; $i++)
              $first[$i] = $seconds[$i] = -1;
          for ($i = $length - 1; $i >= 0; $i--)
          {
              if ($originalKeys[$i])
              {
                  $j = $originalKeys[$i] - $h;
                  if ($j < 0) $j += $length;
                  $seconds[$j] = $first[$br[$j]];
                  $first[$br[$j]] = $j;
              }
          }
          $j = $length - $h;
          $seconds[$j] = $first[$br[$j]];
          $first[$br[$j]] = $j;
          for ($i = $k = 0; $i < $length; $i++)
              if ($first[$i] >= 0)
                  for ($j = $first[$i]; $j >= 0; $j = $seconds[$j])
                      $originalKeys[$k++] = $j;

          for ($i = 0; $i < $length; $i++)
              if ($i>0 && $originalKeys[$i] + $h < $length&&$originalKeys[$i - 1] + $h < $length&&$br[$originalKeys[$i]] == $br[$originalKeys[$i - 1]] && $br[$originalKeys[$i] + $h] == $br[$originalKeys[$i - 1] + $h])
                  $nb[$originalKeys[$i]] = $nb[$originalKeys[$i - 1]];
              else
                  $nb[$originalKeys[$i]] = $i;

          for ($i = 0; $i < $length; $i++)
              $br[$i] = $nb[$i];
      }  
      return $originalKeys;
  }
}

      `
  }
};