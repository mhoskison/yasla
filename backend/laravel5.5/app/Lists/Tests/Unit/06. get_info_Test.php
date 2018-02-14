<?php namespace Tests\Unit\Lists;

class get_info_Test extends \Tests\ControllerTest
{
    /**
     * @test getting the products on a shopping list
     */
    public function success()
    {
        \Auth::loginUsingId(1);

        $controller = new \App\Lists\ListController();
        $d          = $controller->get_info(1);

        $this->assertInstanceOf("\Illuminate\Support\Collection", $d);
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
