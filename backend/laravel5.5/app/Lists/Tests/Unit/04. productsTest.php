<?php namespace Tests\Unit\Lists;


class productsTest extends \Tests\ControllerTest
{
    /**
     * @test getting the products on a shopping list
     */
    public function success()
    {
        \Auth::loginUsingId(1);

        $controller = new \App\Lists\Controller();
        $d          = $controller->get_products(25);
        dd($d);

        $this->assertInternalType("array", $d);
        $this->assertNotEmpty($d);

        $this->assertArrayHasKey("list_id", $d);
        $this->assertArrayHasKey("list_title", $d);
        $this->assertArrayHasKey("products", $d);

        $this->assertInternalType("array", $d["products"]);
        $this->assertNotEmpty($d["products"]);

        $d = $d["products"][0];

        $this->assertArrayHasKey("title", $d);
        $this->assertArrayHasKey("quantity", $d);
        $this->assertArrayHasKey("cost", $d);
    }

    /**
     * @test unauthenticated access
     * @expectedException \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function unauthenticated()
    {
        $controller = new \App\Lists\Controller();
        $controller->get_products(1);
    }
}
