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
        $project = request()->validate(['title' => 'required', 'description' => 'required']);

        Project::create($project);

        $projects = Project::orderBy('created_at', 'desc')->get(); // how can i get the last added project

        return \response(['data' => $projects]);
    }

    public function show(Project $project)
    {
        return \response(['data' => $project]);
    }
}
