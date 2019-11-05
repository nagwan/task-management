<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = [];

    public function path()
    {
        return  route('projects.show' , ['project' => $this->id]);
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }
}
