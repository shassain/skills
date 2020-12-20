<?php

namespace Tests\Unit;

use Tests\TestCase;

class PaddleTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->json('POST', 'api/problem-1',
            [
                "input1"=>"Junior
                            Buenisimos 3 Malisimos 0
                            Buenillos 2 Malillos 1
                            Buenillos 3 Malisimos 0
                            Buenisimos 3 Malillos 0
                            Buenisimos 2 Buenillos 1
                            Malisimos 0 Buenisimos 3
                            Malillos 1 Buenillos 2
                            Malisimos 0 Buenillos 3
                            Malillos 0 Buenisimos 3
                            Buenillos 1 Buenisimos 2
                            FIN
                            Senior
                            Abuelos 3 Abueletes 0
                            Abueletes 2 Abuelos 1
                            FIN
                            "         ]
        );
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "*"=>[
                "category",
                "win",
                "missing_games"
            ]
        ]);
        $response->assertJson([
            [
                "category"=>"Junior",
                "win"=>"Buenisimos",
                "missing_games"=>2
            ],
            [
                "category"=>"Senior",
                "win"=>"EMPATE",
                "missing_games"=>0
            ]
        ]);
    }
}
