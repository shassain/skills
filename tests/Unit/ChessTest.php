<?php

namespace Tests\Unit;

use Tests\TestCase;

class ChessTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testFisrt()
    {

        $response = $this->json('POST', 'api/problema-2',
            [
                "input2"=>"100 0
                        50 28"]
        );
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "attack"
        ]);
        $response->assertJson([
            "attack"=>351
        ]);
        
    }
    public function testSecond()
    {

        $response = $this->json('POST', 'api/problema-2',
            [
                "input2"=>"4 0
                            4 4"]
        );
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "attack"
        ]);
        $response->assertJson([
            "attack"=>9
        ]);
        
    }
    public function testThird()
    {

        $response = $this->json('POST', 'api/problema-2',
            [
                "input2"=>"5 3
                    4 3
                    5 5
                    4 2
                    2 3


                    "]
        );
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "attack"
        ]);
        $response->assertJson([
            "attack"=>10
        ]);
    }
    public function testFourth()
    {

        $response = $this->json('POST', 'api/problema-2',
            [
                "input2"=>"1 0
                    1 1

                    "]
        );
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "attack"
        ]);
        $response->assertJson([
            "attack"=>0
        ]);
    } 
}
