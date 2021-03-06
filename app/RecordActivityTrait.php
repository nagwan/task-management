<?php

namespace App;

trait RecordActivityTrait
{
    public $oldAttributes = [];


    public static function bootRecordActivityTrait()
    {
        static::updating(function($model){
            $model->oldAttributes = $model->getOriginal();
        });
    }

    public function recordActivity($type)
    {
        return $this->activity()->create([
            'project_id' => class_basename($this) === 'Project' ? $this->id : $this->project_id,
            'user_id' => $this->activityOwner()->id,
            'type' => $type,
            'changes' => $this->wasChanged() ? [
                'before' => array_diff($this->oldAttributes, $this->getAttributes()),
                'after' => array_diff($this->getAttributes(), $this->oldAttributes)
            ] : null
        ]);
    }

    protected function activityOwner()
    {
       
        if(class_basename($this) === 'Project'){
            return $this->owner;
        }

        return $this->project->owner;
    }
}
