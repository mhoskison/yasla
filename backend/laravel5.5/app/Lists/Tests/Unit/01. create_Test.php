<?php namespace Tests\Unit\Lists;

class create_Test extends \Tests\ControllerTest
{
    /**
     * @test creating a shopping list
     */
    public function success()
    {
        \Auth::loginUsingId(1);

        $controller = new \App\Lists\ListController();
        $id         = $controller->create("A test list");
        $this->assertGreaterThan(0, $id);

        // ---- Now get the results
        //
        $data = $controller->get($id);
        $this->assertInstanceOf("\App\Lists\Responses\ShoppingLists", $data);

        $this->assertEquals($id, $data->id);
        $this->assertEquals("A test list", $data->label);
    }

    /**
     * @test unauthenticated access
     * @expectedException \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function unauthenticated()
    {
        $controller = new \App\Lists\ListController();
        $controller->create("A test list");
    }
}
