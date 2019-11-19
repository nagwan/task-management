<?php

namespace App\Http\Controllers;

use App\Project;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProjectInvitationsController extends Controller
{
    public function store(Project $project)
    {
        $access = Gate::inspect('manage', $project);

        if ($access->allowed()) {

            if ($project->owner->isNot(auth()->user())) {
                return response()->json([
                    'success' => false,
                    'message' => 'unauthorized'
                ], 403);
            }

            request()->validate(
                [
                    'email' => 'required|exists:users,email',
                ],
            );

            $user = User::whereEmail(request('email'))->first();

            if ($user) {

                $project->invites($user);

                $data = Project::where('id', $project->id)->with('tasks', 'owner', 'owner.profile', 'activity', 'activity.subject', 'activity.user', 'members')->first();

                return response()->json(['data' => $data]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Unprocessable Entity'
            ], 422);
            
        } else {

            return response()->json([
                'success' => false,
                'error' =>  'unauthorized'
            ], 403);
        }
    }
}
