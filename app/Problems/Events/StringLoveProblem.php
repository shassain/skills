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
