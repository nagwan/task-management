<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    public function index()
    {

        $projects = auth()->user()->projects;

        return \response(['data' =>  $projects]);
    }

    public function store()
    {
        $project = request()->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        auth()->user()->projects()->create($project);

        $projects = Project::orderBy('created_at', 'desc')->get(); // how can i get the last added project

        return \response(['data' => $projects]);
    }

    public function show(Project $project)
    {
        if (auth()->user()->isNot($project->owner)) {
            abort(403);
        }
        
        return \response(['data' => $project]);
    }
}
