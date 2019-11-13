<?php

namespace App;

trait RecordActivityTrait
{
    public $old = [];

    public function recordActivity($type)
    {
        return $this->activity()->create([
            'project_id' => class_basename($this) === 'Project' ? $this->id : $this->project_id,
            'type' => $type,
            'changes' => $this->wasChanged() ? [
                'before' => array_diff($this->old, $this->getAttributes()),
                'after' => array_diff($this->getAttributes(), $this->old)
            ] : null
        ]);
    }
}
