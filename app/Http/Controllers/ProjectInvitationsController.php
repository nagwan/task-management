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
        request()->validate(
            [
                'email' => 'required|exists:users,email',
            ],
        );

        $access = Gate::inspect('manage', $project);

        $user = User::whereEmail(request('email'))->first();

        if ($access->allowed()) {

            if ($project->members->contains($user)) {
                return response()->json([
                    'success' => false,
                    'message' => 'already member'
                ], 422);
            } else if ($project->owner->email == (request('email'))) {
                return response()->json([
                    'success' => false,
                    'message' => 'u cannot invite yourself to your own project'
                ], 422);
            }

            $project->invites($user);

            $data = Project::where('id', $project->id)->with('tasks', 'owner', 'owner.profile', 'activity', 'activity.subject', 'activity.user', 'members', 'members.profile')->first();

            return response()->json(['data' => $data]);
        } else {

            return response()->json([
                'success' => false,
                'error' =>  'unauthorized'
            ], 403);
        }
    }
}
