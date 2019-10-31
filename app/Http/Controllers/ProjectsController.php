<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    public function index()
    {

        $projects = Project::where('owner_id', auth()->user()->id)->orderBy('created_at', 'desc')->get();

        return response()->json(['data' =>  $projects], 200);
    }

    public function store()
    {
        $project = request()->validate([
            'title' => 'required|min:3|max:50',
            'description' => 'required|min:5|max:250',
        ]);

        auth()->user()->projects()->create($project);

        $projects = Project::where('owner_id', auth()->user()->id)->orderBy('created_at', 'desc')->get();  // how can i get the last added project

        return response()->json(['data' => $projects], 200);
    }

    public function show(Project $project)
    {
        if (auth()->user()->isNot($project->owner) || !$project) {
            return response()->json([
                'success' => false,
                'message' =>  'not found'
            ], 400);
        }

        return response()->json(['data' => $project]);
    }
}
