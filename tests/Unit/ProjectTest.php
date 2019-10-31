<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    /** @test */

    public function it_has_a_path()
    {
        $project = factory('App\Project')->create();

        $this->assertEquals('http://localhost/api/projects/' . $project->id, $project->path());
    }

    /** @test */

    public function belongs_to_an_owner()
    {
        $project = factory('App\Project')->create();

        $this->assertInstanceOf('App\User', $project->owner);
    }
}
