<?php

namespace App\Http\Controllers;

use App\Activity;
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

        $access = Gate::inspect('hasAccess', $project);

        if ($access->allowed()) {
            $project->addTask(request('body'));

            $data = Project::where('id', $project->id)->with('tasks', 'activity', 'owner', 'owner.profile', 'activity.subject', 'activity.user', 'members', 'members.profile')->first();

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
        $access = Gate::inspect('hasAccess', $task->project);

        if ($access->allowed()) {
            request()->validate([
                'body' => 'required|min:3|max:50',
            ]);

            $task->update([
                'body' => request('body'),
                'completed' => request('completed')
            ]);


            $data = Project::where('id', $project->id)->with('tasks', 'activity', 'owner', 'owner.profile', 'activity.subject', 'activity.user', 'members', 'members.profile')->first();

            return response()->json(['data' => $data], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' =>  'unauthorized'
            ], 403);
        }
    }

    public function delete(Project $project, Task $task)
    {
        $access = Gate::inspect('hasAccess', $task->project);

        if ($access->allowed()) { 

            $task->delete();

            $data = Project::where('id', $project->id)->with('tasks', 'activity', 'activity.subject', 'activity.user', 'members', 'members.profile')->first();

            return response()->json(['data' => $data], 200);
        }

        return response()->json([
            'success' => false,
            'message' =>  'unauthorized'
        ], 403);
    }
}
