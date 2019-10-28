<?php

namespace App\Http\Controllers;


class UsersController extends Controller
{
    public function fetch()
    {

        $user = auth()->user();

        if($user->id){
            return response(['user' => $user], 200);
        }        
    }
}
