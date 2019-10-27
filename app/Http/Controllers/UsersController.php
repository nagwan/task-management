<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        return \response(['data' => $user]);
    }
}
