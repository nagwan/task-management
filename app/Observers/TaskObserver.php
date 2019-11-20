<?php

namespace App\Observers;

use App\Activity;
use App\Task;
use App\User;

class TaskObserver
{
    /**
     * Handle the task "created" event.
     *
     * @param  \App\Task  $task
     * @return void
     */
    public function created(Task $task)
    {
        $task->recordTaskActivities('task_created', $task); 
    }

    /**
     * Handle the task "updated" event.
     *
     * @param  \App\Task  $task
     * @return void
     */
    public function updated(Task $task)
    {
        $type = '';

        if ($task->isDirty('completed')) {

            $task->completed == false ? $type = 'task_incomplete' : $type = 'task_completed';
            
        } else if ($task->isDirty('body')) {

            $type = 'task_updated';
        }

        $task->recordTaskActivities($type, $task);
    }

    /**
     * Handle the task "deleted" event.
     *
     * @param  \App\Task  $task
     * @return void
     */
    public function deleting(Task $task)
    {
        $task->recordTaskActivities('task_deleted', $task);
    }

    /**
     * Handle the task "restored" event.
     *
     * @param  \App\Task  $task
     * @return void
     */
    public function restored(Task $task)
    {
        //
    }

    /**
     * Handle the task "force deleted" event.
     *
     * @param  \App\Task  $task
     * @return void
     */
    public function forceDeleted(Task $task)
    {
        //
    }
}
