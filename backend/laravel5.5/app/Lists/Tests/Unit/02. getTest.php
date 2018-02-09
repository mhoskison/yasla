<?php namespace Tests\Unit\Lists;


class getTest extends \Tests\ControllerTest
{
    /**
     * @test retreiving a list of shopping lists
     */
    public function success()
    {
        \Auth::loginUsingId(1);

        $controller = new \App\Lists\Controller();
        $d          = $controller->get_list();
        dd($d);

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
        $controller = new \App\Lists\Controller();
        $controller->get_list();
    }
}
