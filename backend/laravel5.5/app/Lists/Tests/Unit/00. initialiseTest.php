<?php namespace Tests\Unit\Lists;

use \App\Http\Controllers\ListsController;
use Tests\TestCase;

class ControllerTest extends TestCase
{
    public function testInitialise()
    {
        \Auth::loginUsingId(1);

        // ---- Reset the table to empty
        //
        $controller = new \App\Lists\ListController();
        $controller->purge();

        $controller = new \App\Lists\ListController();
        $id1 = $controller->create("List one");
        $this->assertEquals(1, $id1);

        $controller = new \App\Lists\ListController();
        $id2 = $controller->create("List two");
        $this->assertEquals(2, $id2);

        $controller = new \App\Lists\ListController();
        $id3 = $controller->create("List three");
        $this->assertEquals(3, $id3);
    }
}
