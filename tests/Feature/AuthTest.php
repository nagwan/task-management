<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /** @test */

    public function a_user_can_create_an_account()
    {
        $attributes = factory('App\User')->create();

        $this->post('/register', $attributes);
    }

    /** @test */

    public function a_user_can_login()
    {
        $attributes = factory('App\User')->create();

        $this->post('/login', $attributes);
    }
}
