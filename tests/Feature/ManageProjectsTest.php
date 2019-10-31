<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ManageProjectsTest extends TestCase
{

    use WithFaker, RefreshDatabase;

    /** @test */

    public function guests_cannot_create_projects()
    {

        $attributes = factory('App\Project')->raw();

        $this->postJson('api/projects', $attributes)->assertStatus(401);

    }

    /** @test */
    public function guests_cannot_view_projects()
    {

        $this->getJson('api/projects')->assertStatus(401);
    }

    /** @test */
    public function guests_cannot_view_a_single_project()
    {
        $project = factory('App\Project')->create();

        $this->getJson($project->path())->assertStatus(401);
    }

    /** @test */

    public function a_user_can_create_a_project()
    {
        $this->withoutExceptionHandling();

        $user = factory('App\User')->create();

        $attributes = [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph
        ];

        $this->postJson('api/projects', $attributes , [
            'authorization' => 'Bearer '. $user->api_token
        ]);

        $this->assertDatabaseHas('projects', $attributes);

        $this->getJson('api/projects')->assertSee($attributes['title']);
    }


    /** @test */

    public function a_project_requires_a_title()
    {
        $user = factory('App\User')->create();

        $attributes = factory('App\Project')->raw(['title' => '']);

        $this->postJson('api/projects', $attributes, [
            'authorization' => 'Bearer '. $user->api_token
        ])->assertStatus(422);
    }


    /** @test */

    public function a_project_requires_a_description()
    {
        $user = factory('App\User')->create();

        $attributes = factory('App\Project')->raw(['description' => '']);

        $this->postJson('api/projects', $attributes, [
            'authorization' => 'Bearer '. $user->api_token
        ])->assertStatus(422);
    }

    /** @test */

    public function a_user_can_view_their_project()
    {
        $this->withoutExceptionHandling();

        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $this->getJson($project->path(), [
            'authorization' => 'Bearer '. $user->api_token
        ])
            ->assertSee($project->title)
            ->assertSee($project->description);
    }

    /** @test */

    public function an_authenticated_user_cannot_see_the_projects_of_others()
    {

        $user = factory('App\User')->create();

        $project = factory('App\Project')->create();

        $this->withoutExceptionHandling();
        $this->getJson($project->path(), [
            'authorization' => 'Bearer '. $user->api_token
        ])->assertStatus(403);
    }
}
