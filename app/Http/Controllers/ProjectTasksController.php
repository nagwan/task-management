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

        $task = request()->validate([
            'body' => 'required|min:3|max:50',
        ]);

        $project->addTask(request('body'));

        

        return response()->json(['data' => $project], 200);
    }
}
