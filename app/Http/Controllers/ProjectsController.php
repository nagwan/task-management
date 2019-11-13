<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProjectsController extends Controller
{
    public function index()
    {

        $projects = Project::where('owner_id', auth()->user()->id)->with('tasks')->orderBy('created_at', 'desc')->get();

        return response()->json(['data' =>  $projects], 200);
    }

    public function store()
    {

        $project = request()->validate([
            'title' => 'required|min:3|max:50',
            'description' => 'required|min:5|max:250',
        ]);

        auth()->user()->projects()->create($project);

        $projects = Project::where('owner_id', auth()->user()->id)->orderBy('created_at', 'desc')->with('tasks')->get();  // how can i get the last added project

        return response()->json(['data' => $projects], 200);
    }

    public function show(Project $project)
    {

        $access = Gate::inspect('manage', $project);

        if ($access->allowed()) {

            $data = Project::where('id', $project->id)->with('tasks')->first();

            return response()->json(['data' => $data]);
            
        } else {

            return response()->json([
                'success' => false,
                'message' =>  'unauthorized'
            ], 403);
        }
    }

    public function update(Project $project)
    {
        $access = Gate::inspect('manage', $project);

        if ($access->allowed()) {

            request()->validate([
                'title' => 'required|min:3|max:50',
                'description' => 'required|min:5|max:250',
            ]);

            $project->update([
                'title' => request('title'),
                'description' => request('description')
            ]);

            $data = Project::where('id', $project->id)->with('tasks')->first();

            return response()->json(['data' => $data]);
        } else {

            return response()->json([
                'success' => false,
                'message' =>  'unauthorized'
            ], 403);
        }
    }

    public function delete(Project $project)
    {
        $access = Gate::inspect('manage', $project);

        if ($access->allowed()) {

            

            $project->delete();

            $data = Project::where('owner_id', auth()->user()->id)->with('tasks')->orderBy('created_at', 'desc')->get();

            return response()->json(['data' => $data]);
            
        } else {

            return response()->json([
                'success' => false,
                'message' =>  'unauthorized'
            ], 403);
        }
        
    }
}
