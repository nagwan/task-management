<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['middleware' => 'guest'], function(){

    Route::post('/register', 'AuthenticationController@register');

    Route::post('/login', 'AuthenticationController@login');
});

Route::group(['middleware' => 'auth:api'], function () {

    Route::post('/projects', 'ProjectsController@store');

    Route::get('/projects', 'ProjectsController@index');
 
    Route::post('/user', 'UsersController@fetch');

    Route::post('/projects/{project}/tasks', 'ProjectTasksController@store');

    Route::get('/projects/{project}', 'ProjectsController@show')->name('projects.show');

    Route::get('/home', 'HomeController@index')->name('home');

});
