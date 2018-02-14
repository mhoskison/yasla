<?php namespace Tests\Unit\Lists;

class get_all_Test extends \Tests\ControllerTest
{
    /**
     * @test retrieving a list of shopping lists
     */
    public function success()
    {
        \Auth::loginUsingId(1);

        $controller = new \App\Lists\ListController();
        $d          = $controller->get_all();

        $this->assertInstanceOf("\Illuminate\Support\Collection", $d);
        $this->assertNotEmpty($d);
        $d = $d[0];


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
        $controller->get_all();
    }
}
