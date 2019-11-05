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
        $user = factory('App\User')->make(); 

        $this->postJson('api/register', $user);

        $this->assertDatabaseHas('users', $user);
    }

    /** @test */

    public function a_user_can_login()
    {
        $user = factory('App\User')->create();

        $this->postJson('api/login', $user, [
            'authorization' => 'Bearer '. $user->api_token
        ]);

        $this->getJson('api/user')->assertStatus(200);
    }
}
