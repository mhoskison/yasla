<?php

namespace App\Listeners;

use App\Lists\Events\ProductCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ListCreatedListener
{
    public function subscribe($events)
    {
        $events->listen('App\Events\ListCreated', 'App\Listeners\ListCreatedListener@onListCreated');
    }

    public function onListCreated($event)
    {
        \Log::debug("list created!");
    }
}
