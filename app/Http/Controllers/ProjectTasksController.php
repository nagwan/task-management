<?php

namespace App\Http\Controllers;

use App\Project;
use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProjectTasksController extends Controller
{

    public function store(Project $project)
    {

        request()->validate([
            'body' => 'required|min:3|max:50',
        ]);

        $access = Gate::inspect('manage', $project);

        if ($access->allowed()) {
            $project->addTask(request('body'));

            $data = Task::where('project_id', $project->id)->get();;

            return response()->json(['data' => $data], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' =>  'unauthorized'
            ], 403);
        }
    }

    public function update(Project $project, Task $task)
    {
        $access = Gate::inspect('manage', $task->project);

        if ($access->allowed()) {
            request()->validate([
                'body' => 'required|min:3|max:50',
            ]);

            $task->update([
                'body' => request('body'),
                'completed' => request('completed')
            ]);

            $data = Task::where('project_id', $project->id)->get();

            return response()->json(['data' => $data], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' =>  'unauthorized'
            ], 403);
        }
    }
}
