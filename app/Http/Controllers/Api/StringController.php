<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use SplFixedArray;

/* 
#define nb seconds
#define first height
#define rank b

const int maxn = 200010;
char s[maxn];
int n, id[maxn], height[maxn], b[maxn], seconds[maxn];

bool cmp(const int& i, const int& j)
{
	return s[i] < s[j];
} */


class StringController extends Controller
{
    protected $id;
    protected $body;
    public function __construct(){
        $this->id=collect();
        $this->b=collect();
    }
    public function SuffixSort($length,$str)
    {
        $j=0; $k=0; $h=0;
        $split=str_split($str);
        asort($split);
        $split=collect($split);
        $split->each(function($value,$key){
            $this->id->push($key);
            $this->b->push(0);
        });
        $this->id->each(function($value,$key)use($split){
            $this->b[$value]=($key == 0 || $split[$value] != $split[$this->id[$key - 1]])
                            ?
                            $key
                            :
                            $this->b[$this->id[$key - 1]];
        });
        

        
        
        for ($h = 1; $h < $length; $h *=2)
        {
            $seconds=[];
            $first=[];
            for ($i = 0; $i < $length; $i++)
                $first[$i] = $seconds[$i] = -1;
            for ($i = $length - 1; $i >= 0; $i--)
            {
                if ($this->id[$i])
                {
                    $j = $this->id[$i] - $h;
                    if ($j < 0) $j += $length;
                    $seconds[$j] = $first[$this->b[$j]];
                    $first[$this->b[$j]] = $j;
                }
            }
            $j = $length - $h;
            $seconds[$j] = $first[$this->b[$j]];
            $first[$this->b[$j]] = $j;
            for ($i = $k = 0; $i < $length; $i++)
                if ($first[$i] >= 0)
                    for ($j = $first[$i]; $j >= 0; $j = $seconds[$j])
                        $this->id[$k++] = $j;

            for ($i = 0; $i < $length; $i++)
                if ($i>0 && $this->id[$i] + $h < $length&&$this->id[$i - 1] + $h < $length&&$this->b[$this->id[$i]] == $this->b[$this->id[$i - 1]] && $this->b[$this->id[$i] + $h] == $this->b[$this->id[$i - 1] + $h])
                    $nb[$this->id[$i]] = $nb[$this->id[$i - 1]];
                else
                    $nb[$this->id[$i]] = $i;

            for ($i = 0; $i < $length; $i++)
                $this->b[$i] = $nb[$i];
        }  
        dd($this->id);
    }

    public function index(Request $request){
        $lenth=strlen($request->input3);
        $top=0;
        dd($this->SuffixSort($lenth,$request->input3));
    }
}
