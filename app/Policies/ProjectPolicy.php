<?php

namespace App\Policies;

use App\Project;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    use HandlesAuthorization;


    public function manage(User $user, Project $project)
    {
        return $user->is($project->owner) || $project->members->contains($user)
            ? Response::allow()
            : Response::deny();
    }
}
