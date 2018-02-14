<?php namespace Tests\Unit\Lists;

use App\Product\ProductDescription;

class add_product_Test extends \Tests\ControllerTest
{
    /**
     * @test getting the products on a shopping list
     */
    public function success()
    {
        // ---- Set up the environment
        //
        \Auth::loginUsingId(1);
        $controller           = new \App\Lists\ListController();
        $product              = new ProductDescription();
        $product->price       = 0.25;
        $product->description = "Tin of beans";
        $product->name        = "Heinz Beans";

        $lists =$controller->get_all();

            // ---- Perform the test
            //

        $result = $controller->products_add(1, $product);
        $this->assertGreaterThan(0, $result);

        // ---- Do a low level test on the DB
        //
        $sql = "SELECT * FROM ";
    }

    /**
     * @test unauthenticated access
     * @expectedException \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function unauthenticated()
    {
        $controller = new \App\Lists\ListController();
        $controller->products_add(1, new ProductDescription());
    }
}
