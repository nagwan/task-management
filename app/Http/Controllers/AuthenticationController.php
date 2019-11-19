<?php

namespace App\Http\Controllers;

use App\Profile;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request['password']),
        ]);

        Profile::create([
            'user_id' => $user->id
        ]);

        $user_data = User::where('email', $request->email)->with('profile')->get()->first();

        $user_data->api_token = Str::random(80);

        $user_data->save();

        $response = [
            'success' => true,
            'data' => [
                'id' => $user_data->id,
                'api_token' => $user_data->api_token,
                'name' => $user_data->name,
                'email' => $user_data->email,
                'profile' => $user->profile
            ]
        ];

        return response()->json($response);
    }

    public function login(Request $request)
    {

        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        $user = User::where('email', $request->email)->with('profile')->get()->first();

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            $user->api_token = Str::random(80);

            $user->save();

            $response = [
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'api_token' => $user->api_token,
                    'name' => $user->name,
                    'email' => $user->email,
                    'profile' => $user->profile
                ] 
            ];
        } else
            $response = ['success' => false, 'data' => 'Record doest`t exists'];

        return response()->json($response, 201);
    }

    public function logOut(Request $request)
    {
        return auth()->user()->api_token = null;
    }
}
