<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ShopTest extends TestCase
{
    /**
     * homeページが表示できるかのテスト
     */
    public function test_home(): void
    {
        $response = $this->get('/home');
        $response->assertStatus(200);
    }
}
