<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login()
    {

        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {

            $user = Auth::user();

            $response['token'] =  $user->createToken('MyApp')->accessToken;

            $response['user'] = $user;

            return \response(['data' =>  $response], 200);

            //return response()->json(['success' => $success], $this->successStatus);
            
        } else {

            return \response()(['error' => 'Unauthorized'], 401);
        }

    }

}
