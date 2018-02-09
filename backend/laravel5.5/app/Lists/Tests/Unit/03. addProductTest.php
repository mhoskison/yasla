<?php namespace Tests\Unit\Lists;


use App\Product\ProductDescription;

class addProductTest extends \Tests\ControllerTest
{
    /**
     * @test getting the products on a shopping list
     */
    public function success()
    {
        \Auth::loginUsingId(1);

        $product              = new ProductDescription();
        $product->price       = 0.25;
        $product->description = "Tin of beans";
        $product->name        = "Heinz Beans";

        $controller = new \App\Lists\Controller();
        $result     = $controller->add_product(1, $product);

        dd($result);

    }

    /**
     * @test unauthenticated access
     * @expectedException \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function unauthenticated()
    {
        $controller = new \App\Lists\Controller();
        $controller->add_product(1, new ProductDescription());
    }
}
