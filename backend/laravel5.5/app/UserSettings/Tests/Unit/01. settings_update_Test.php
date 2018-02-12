<?php namespace Tests\Unit\UserSettings;

use \App\Http\Controllers\ListsController;
use App\Lists\ListService;
use Tests\TestCase;

class settings_update_Test extends \Tests\TransactionTest
{
    /**
     * @test updating a user's settings
     */
    public function update()
    {
        \Auth::loginUsingId(1);
        $ctrl = new \App\UserSettings\Controller();
        $ctrl->set("test", "value");

        // ---- Get the value back
        //
        $d = $ctrl->get("test");
        $this->assertEquals("value", $d);

        // ---- Do it again, with a different value
        //
        $ctrl->set("test", "new value");
        $d = $ctrl->get("test");
        $this->assertEquals("new value", $d);

        // ---- Add another value
        //
        $ctrl->set("theme", "blue");
        $d = $ctrl->get("theme");
        $this->assertEquals("blue", $d);

        // ---- Get them all
        //
        $d = $ctrl->get_all();
        $this->assertInternalType("array", $d);
        $this->assertCount(2, $d);
        $this->assertEquals("blue", $d["theme"]);
        $this->assertequals("new value", $d["test"]);
    }
}
