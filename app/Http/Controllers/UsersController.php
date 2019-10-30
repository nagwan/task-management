<?php

namespace App\Http\Controllers;


class UsersController extends Controller
{
    public function fetch()
    {

        $user = Auth::user();

        return response()->json(['user' => $user]);
    }
}
