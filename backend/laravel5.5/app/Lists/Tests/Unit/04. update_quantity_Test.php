<?php namespace Tests\Unit\Lists;

use App\Product\ProductDescription;

class update_quantity_Test extends \Tests\ControllerTest
{
    /**
     * @test updating the quantity of a product on a shopping list
     */
    public function success()
    {
        // ---- 1. Login
        //
        \Auth::loginUsingId(1);

        // ---- 2. Create a new shopping list
        //
        $controller = new \App\Lists\ListController();
        $list_id    = $controller->create("A test list");
        $this->assertGreaterThan(0, $list_id);

        // ---- 3.  Add a product to the new list
        //
        $product              = new ProductDescription();
        $product->price       = 16.67;
        $product->description = "Tin of beans";
        $product->name        = "Heinz Beans";
        $product_id           = $controller->products_add($list_id, $product);
        $this->assertGreaterThan(0, $product_id);

        // ---- Ensure it got saved correctly
        //      @bug Assumes a MySql backend
        $sql = "SELECT * FROM tblProduct WHERE price=16.67";
        $rst = \DB::select($sql);
        $this->assertCount(1, $rst);

        $sql = "SELECT * FROM tblListProduct WHERE list_id=?";
        $rst = \DB::select($sql, [$list_id]);
        $this->assertCount(1, $rst);

        // ---- Get the list in its current state
        //
        $list = $controller->products_get($list_id);
        $products = $list["products"];
        $this->assertInternalType("array", $products);
        $this->assertCount(1, $products);
        $product = $products[0];

        $this->assertEquals(1, $product->quantity);
        $product_id = $product->id;

        // ---- Perform the test
        //
        $controller->products_update($list_id, $product_id, 12);

        // ---- And test the results again
        //
        $list = $controller->products_get($list_id);
        $product = $list["products"][0];
        $this->assertEquals(12, $product->quantity);
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
