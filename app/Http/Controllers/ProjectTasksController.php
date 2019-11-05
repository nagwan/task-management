<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectTasksController extends Controller
{
    public function index()
    {
        
    }

    public function store(Project $project)
    {

        request()->validate([
            'body' => 'required|min:3|max:50',
        ]);

        
        if (auth()->user()->isNot($project->owner)) {
            return response()->json([
                'success' => false,
                'message' =>  'unauthorized'
            ], 403);
        }

        $project->addTask(request('body'));

        $data = Project::where('id', $project->id)->with('tasks')->first();

        return response()->json(['data' => $data], 200);
    }
}
