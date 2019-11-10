<?php

namespace Tests\Feature;

use App\Project;
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

        $user = factory('App\User')->create();

        $attributes = [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
        ];

        $this->postJson('api/projects', $attributes, [
            'authorization' => 'Bearer ' . $user->api_token
        ]);

        $this->assertDatabaseHas('projects', $attributes);

        $project = Project::where($attributes)->first();

        $this->getJson($project->path(), [
            'authorization' => 'Bearer ' . $user->api_token
        ])
            ->assertSee($project->title)
            ->assertSee($project->description);
    }

    /** @test */

    public function a_user_can_update_project()
    {
        $this->withoutExceptionHandling();

        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $this->postJson($project->path(), [
            'title' => 'title changed',
            'description' => 'description changed'
        ], [
            'authorization' => 'Bearer ' . $user->api_token
        ]);

        $this->assertDatabaseHas('projects', ['title' => 'title changed', 'description' => 'description changed']);
    }

    /** @test */

    public function only_the_owner_of_a_project_can_update_a_project()
    {

        $this->withoutExceptionHandling();

        $user = factory('App\User')->create();

        $project = factory('App\Project')->create();

        $this->postJson($project->path(), [
            'title' => 'title changed',
            'description' => 'description changed'
        ], [
            'authorization' => 'Bearer ' . $user->api_token
        ])->assertStatus(403);
    }


    /** @test */
    public function a_project_requires_a_title()
    {
        $user = factory('App\User')->create();

        $attributes = factory('App\Project')->raw(['title' => '']);

        $this->postJson('api/projects', $attributes, [
            'authorization' => 'Bearer ' . $user->api_token
        ])->assertStatus(422);
    }


    /** @test */

    public function a_project_requires_a_description()
    {
        $user = factory('App\User')->create();

        $attributes = factory('App\Project')->raw(['description' => '']);

        $this->postJson('api/projects', $attributes, [
            'authorization' => 'Bearer ' . $user->api_token
        ])->assertStatus(422);
    }

    /** @test */

    public function a_user_can_view_their_project()
    {
        $this->withoutExceptionHandling();

        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $this->getJson($project->path(), [
            'authorization' => 'Bearer ' . $user->api_token
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
            'authorization' => 'Bearer ' . $user->api_token
        ])->assertStatus(403);
    }
}
