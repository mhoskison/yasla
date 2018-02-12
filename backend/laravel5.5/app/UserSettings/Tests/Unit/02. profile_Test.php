<?php namespace Tests\Unit\UserSettings;

use \App\Http\Controllers\ListsController;
use App\Lists\ListService;
use Tests\TestCase;

class profile_Test extends \Tests\TransactionTest
{
    /**
     * @test updating a user's settings
     */
    public function profile()
    {
        \Auth::loginUsingId(1);
        $ctrl = new \App\UserSettings\Controller();
        $d    = $ctrl->profile();
        dd($d);
    }
}
