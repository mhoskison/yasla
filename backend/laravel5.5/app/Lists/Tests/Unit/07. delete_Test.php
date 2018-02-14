<?php namespace Tests\Unit\Lists;

class delete_Test extends \Tests\ControllerTest
{
    /**
     * @test deleting a shopping list
     */
    public function success()
    {
        // ---- Set up the environment
        //
        \Auth::loginUsingId(1);
        $controller = new \App\Lists\ListController();
        $id         = $controller->create("A test list");
        $this->assertGreaterThan(0, $id);

        // ---- Get the current lists
        //
        $lists     = $controller->get_all();
        $old_count = count($lists);

        // ---- Perform the test
        //
        $controller = new \App\Lists\ListController();
        $controller->remove($id);

        $lists     = $controller->get_all();
        $new_count = count($lists);
        $this->assertEquals($old_count - 1, $new_count);
    }

    /**
     * @test unauthenticated access
     * @expectedException \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function unauthenticated()
    {
        $controller = new \App\Lists\ListController();
        $controller->get_info(1);
    }
}
