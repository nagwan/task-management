<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProjectTasksTest extends TestCase
{
    use RefreshDatabase;

    /** @test */

    public function a_project_can_have_tasks()
    {

        $this->withoutExceptionHandling();

        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $this->postJson($project->path() . '/tasks', ['body' => 'Test Task'], [
            'authorization' => 'Bearer ' . $user->api_token
        ]);

        $this->getJson($project->path(), [
            'authorization' => 'Bearer ' . $user->api_token
        ])
            ->assertStatus(200);
    }


    /** @test */

    public function a_task_requires_a_body()
    {
        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $attributes = factory('App\Task')->raw(['body' => '']);

        $this->postJson($project->path() . '/tasks', $attributes, [
            'authorization' => 'Bearer ' . $user->api_token
        ])->assertStatus(422);
    }
}
