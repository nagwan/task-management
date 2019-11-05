<?php

namespace App\Http\Controllers;

use App\Project;
use App\Task;
use Illuminate\Http\Request;

class ProjectTasksController extends Controller
{
    public function index()
    { }

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

    public function update(Project $project, Task $task)
    {

        if (auth()->user()->isNot($project->owner)) {
            return response()->json([
                'success' => false,
                'message' =>  'unauthorized'
            ], 403);
        }

        request()->validate([
            'body' => 'required|min:3|max:50', 
        ]);

        $task->update([
            'body' => request('body'),
            'completed' => request('completed')
        ]);

        $data = Task::where('project_id', $project->id)->get();

        return response()->json(['data' => $data], 200);
    }
}
