<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use RecordActivityTrait;
    
    protected $guarded = [];

    public function path()
    {
        return  route('projects.show' , ['project' => $this->id]);
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function addTask($body)
    {
        return $this->tasks()->create(compact('body'));
    }

    public function activity()
    {
        return $this->hasMany(Activity::class)->latest();
    }

}
