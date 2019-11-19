<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Profile;
use Faker\Generator as Faker;

$factory->define(Profile::class, function (Faker $faker) {
    return [
        'user_id' => function(){
            return factory(App\User::class)->create()->id;
        }
    ];
});
