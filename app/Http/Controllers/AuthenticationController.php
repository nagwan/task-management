<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'password_confirmation' => 'required|same:password'
        ]);

        $token = Str::random(80);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'api_token' => hash('sha256', $token),
        ]);

        return response(['token' => $user->api_token]);
    }

    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($credentials)) {

            $token = auth()->user()->createToken('taskyDo')->accessToken;

            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['error' => 'UnAuthorized'], 401);
        }
    }
}
