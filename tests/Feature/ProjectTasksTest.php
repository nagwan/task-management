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

    /** @test */

    public function only_the_owner_of_a_project_may_add_tasks()
    {
        $user = factory('App\User')->create();

        $project = factory('App\Project')->create();

        $this->postJson($project->path() . '/tasks', ['body' => 'new test task'], [
            'authorization' => 'Bearer ' . $user->api_token
        ])->assertStatus(403);
    }

    /** @test */

    public function a_task_can_be_updated()
    {
        $this->withoutExceptionHandling();

        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $task = $project->addTask('test task');

        $this->postJson($task->path(), ['body' => 'changed', 'completed' => true], [
            'authorization' => 'Bearer ' . $user->api_token
        ]);

        $this->assertDatabaseHas('tasks', ['body' => 'changed', 'completed' => true]);
    }

    /** @test */

    public function only_the_owner_of_a_project_may_update_tasks()
    {
        $user = factory('App\User')->create();

        $project = factory('App\Project')->create();

        $task = $project->addTask('test task');

        $this->postJson($task->path(), ['body' => 'changed', 'completed' => true], [
            'authorization' => 'Bearer ' . $user->api_token
        ])->assertStatus(403);

        $this->assertDatabaseMissing('tasks', ['body' => 'changed', 'completed' => true]);
    }

    /** @test */

    public function only_the_owner_of_a_project_may_delete_tasks()
    {

        $this->withoutExceptionHandling();

        $owner = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $owner->id]);

        $task = $project->addTask('test task');

        $this->deleteJson($task->path(), [], [
            'authorization' => 'Bearer ' . $owner->api_token
        ])->assertStatus(200);

        $this->assertDatabaseMissing('tasks', $task->only('id'));
    }

    /** @test */

    public function members_can_delete_tasks()
    {
        $this->withoutExceptionHandling();

        $owner = factory('App\User')->create();

        $member = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $owner->id]);

        $project->invites($member);

        $task = $project->addTask('test task');

        $this->deleteJson($task->path(), [], [
            'authorization' => 'Bearer ' . $member->api_token
        ])->assertStatus(200);
        
        $this->assertDatabaseMissing('tasks', $task->only('id'));

    }
}
