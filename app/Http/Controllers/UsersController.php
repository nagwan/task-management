<?php

namespace App\Http\Controllers;

class UsersController extends Controller
{
    public function fetch()
    {

        $user = auth()->user()->with('projects')->first();

        return response()->json(['user' => $user]);
    }
}
