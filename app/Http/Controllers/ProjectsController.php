<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    public function index()
    {

        $projects = Project::all();

        return \response(['data' =>  $projects]);
    }

    public function store()
    {
        $project = request()->validate(['title' =>'required', 'description' =>'required']);

        Project::create($project);

        return \response(['data' => $project]);
    }

    public function show(Project $project)
    {
        return \response(['data' => $project]);
    }
}
