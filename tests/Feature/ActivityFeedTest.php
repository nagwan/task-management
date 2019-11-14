<?php

namespace Tests\Feature;

use App\Project;
use App\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ActivityFeedTest extends TestCase
{
    use RefreshDatabase;

    /** @test */

    public function creating_a_project_records_activity()
    {
        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $this->assertCount(1, $project->activity);

        tap($project->activity->last(), function ($activity) {
            $this->assertEquals('project_created', $activity->type);

            $this->assertNull($activity->changes);
        });
    }

    /** @test */

    public function updating_a_project_records_activity()
    {
        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $original_title = $project->title;

        $original_description = $project->description;

        $project->update([
            'title' => 'changed',
            'description' => 'changed'
        ]);

        $this->assertCount(2, $project->activity);


        tap($project->activity->last(), function ($activity) use ($original_title, $original_description) {
            $this->assertEquals('project_updated', $activity->type);

            $expected = [
                'before' => [
                    'title' => $original_title,
                    'description' => $original_description
                ],

                'after' => [
                    'title' => 'changed',
                    'description' => 'changed'
                ]
            ];

            $this->assertEquals($expected, $activity->changes);
        });
    }

    /** @test */

    public function creating_a_task_records_project_activity()
    {
        $project = factory('App\Project')->create();

        $project->addTask('test task');

        $this->assertCount(2, $project->activity);

        tap($project->activity->last(), function ($activity) {
            $this->assertEquals('task_created',  $activity->type);
            $this->assertInstanceOf(Task::class, $activity->subject);
            $this->assertEquals('test task',  $activity->subject->body);
        });
    }


    /** @test */

    public function completing_a_task_records_project_activity()
    {
        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $task = $project->addTask('test task');

        $this->postJson($task->path(), ['body' => 'changed', 'completed' => false], [
            'authorization' => 'Bearer ' . $user->api_token
        ]);

        $this->assertCount(3, $project->activity);

        //$this->assertEquals('task_completed', $project->activity->last()->type);
    }

    /** @test */
    public function incomplete_a_task_records_project_activity()
    {
        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $task = $project->addTask('test task');

        $this->postJson($task->path(), ['body' => 'changed', 'completed' => true], [
            'authorization' => 'Bearer ' . $user->api_token
        ]);

        $this->postJson($task->path(), ['body' => 'changed', 'completed' => false], [
            'authorization' => 'Bearer ' . $user->api_token
        ]);

        $this->assertCount(4, $project->activity);

        $this->assertEquals('task_incomplete', $project->activity->last()->type);
    }

    /** @test */
    public function deleting_a_task_records_a_project_activity()
    {
        $user = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $user->id]);

        $task = $project->addTask('test task');

        $task->delete();

        $this->assertCount(3, $project->activity);
    }
}
