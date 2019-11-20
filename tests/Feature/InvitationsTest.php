<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class InvitationsTest extends TestCase
{
    use RefreshDatabase;


    /** @test */

    public function a_project_can_invite_a_user()
    {
        $this->withoutExceptionHandling();

        $owner = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $owner->id]);

        $member = factory('App\User')->create();


        $this->postJson(action('ProjectInvitationsController@store', $project), [
            'email' => $member->email
        ], [
            'authorization' => 'Bearer ' . $owner->api_token
        ]);

        $this->assertTrue($project->members->contains($member));
    }

    /** @test */

    public function only_the_owner_of_the_project_can_invite_users()
    {
        $user = factory('App\User')->create();

        $project = factory('App\Project')->create();

        $member = factory('App\User')->create();

        $this->postJson(action('ProjectInvitationsController@store', $project), [
            'email' => $member->email
        ], [
            'authorization' => 'Bearer ' . $user->api_token
        ])->assertStatus(403);
    }

    /** @test */

    public function members_of_a_project_cannot_invite_others()
    {

        $owner = factory('App\User')->create();

        $member = factory('App\User')->create();

        $member_2 = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $owner->id]);

        $project->invites($member);

        $this->postJson(action('ProjectInvitationsController@store', $project), [
            'email' => $member_2->email
        ], [
            'authorization' => 'Bearer ' . $member->api_token
        ])->assertStatus(403);
    }


    /** @test */

    public function only_authenticated_users_can_be_invited_to_projects()
    {
        $owner = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $owner->id]);

        $member = factory('App\User')->make();

        $this->postJson(action('ProjectInvitationsController@store', $project), [
            'email' => $member->email
        ], [
            'authorization' => 'Bearer ' . $owner->api_token
        ])->assertStatus(422);
    }

    /** @test */

    public function invited_users_can_access_the_projects_they_invited_to()
    {
        /**
         * 1. there is a project 
         * 2. the owner of the project invites another user 
         * 3. then the new user will be able to ...
         *      - add task 
         *      - remove task
         *      - (in)complete tasks
         *      - update project 
         * 4. this invited user will not be able to ...
         *      - delete project
         *      - invite others 
         */

        $owner = factory('App\User')->create();

        $member = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $owner->id]);

        $project->invites($member);

        $this->postJson(action('ProjectTasksController@store', $project), $task = ['body' => 'test task'], [
            'authorization' => 'Bearer ' . $member->api_token
        ]);

        $this->assertDatabaseHas('tasks', $task);
    }


    /** @test */

    public function the_owner_of_a_project_can_remove_member()
    {
        $this->withoutExceptionHandling();
        
        $owner = factory('App\User')->create();

        $member = factory('App\User')->create();

        $project = factory('App\Project')->create(['owner_id' => $owner->id]);

        $project->invites($member);

        $this->deleteJson($project->path() .'/invitations/' . $member->id, ['id' => $member->id], [
            'authorization' => 'Bearer ' . $owner->api_token
        ]);

        $this->assertFalse($project->members->contains($member));
    }

        /** @test */

        public function only_the_owner_of_a_project_can_remove_member()
        {
            $this->withoutExceptionHandling();
            
            $owner = factory('App\User')->create();
    
            $member = factory('App\User')->create();

            $member_2 = factory('App\User')->create();
    
            $project = factory('App\Project')->create(['owner_id' => $owner->id]);
    
            $project->invites($member);
            $project->invites($member_2);
    
            $this->deleteJson($project->path() .'/invitations/' . $member_2->id, ['id' => $member_2->id], [
                'authorization' => 'Bearer ' . $member->api_token
            ])->assertStatus(403);

            $this->assertTrue($project->members->contains($member && $member_2));
    
        }
}
