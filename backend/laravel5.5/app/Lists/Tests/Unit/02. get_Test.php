<?php namespace Tests\Unit\Lists;

class get_Test extends \Tests\ControllerTest
{
    /**
     * @test retrieving a list of shopping lists
     */
    public function success()
    {
        \Auth::loginUsingId(1);

        // ---- Set up the environment
        //
        $controller       = new \App\Lists\ListController();
        $expected_list_id = $controller->create("A test list");
        $this->assertGreaterThan(0, $expected_list_id);

        // ---- Perform the test
        //

        $controller = new \App\Lists\ListController();
        $d          = $controller->get($expected_list_id);

        $this->assertInstanceOf("\App\Lists\Responses\ShoppingLists", $d);
    }

    /**
     * @test unauthenticated
     * @expectedException \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function unauthenticated()
    {
        \Auth::logout();
        $controller = new \App\Lists\ListController();
        $d = $controller->get_all();
    }
}
