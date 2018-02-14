<?php namespace Tests\Unit\Lists;

use App\Product\ProductDescription;

class get_products_Test extends \Tests\ControllerTest
{
    /**
     * @test getting the products on a shopping list
     */
    public function success()
    {
        \Auth::loginUsingId(1);

        // ---- Get the id of a user's shopping lists
        //
        $ctrl = new \App\Lists\ListController();
        $list = $ctrl->get_all();
        $this->assertInstanceOf("\Illuminate\Support\Collection", $list);
        $this->assertGreaterThan(0, count($list));
        $list_id = $list[0]->id;

        // ---- Add a product to it so we know there's at least one product later on
        //
        $product              = new ProductDescription();
        $product->price       = 16.67;
        $product->description = "Tin of beans";
        $product->name        = "Heinz Beans";
        $product_id           = $ctrl->products_add($list_id, $product);
        $this->assertGreaterThan(0, $product_id);
        $ctrl->products_add($list_id, $product);

        // ---- Perform the test
        //
        $controller = new \App\Lists\ListController();
        $d          = $controller->products_get($list_id);


        $this->assertInternalType("array", $d);
        $this->assertNotEmpty($d);

        $this->assertArrayHasKey("list", $d);
        $this->assertArrayHasKey("products", $d);

        $this->assertObjectHasAttribute("id", $d["list"]);
        $this->assertObjectHasAttribute("label", $d["list"]);

        $this->assertInternalType("array", $d["products"]);
        $this->assertNotEmpty($d["products"]);

        $d = $d["products"][0];
        $this->assertObjectHasAttribute("name", $d);
        $this->assertObjectHasAttribute("quantity", $d);
        $this->assertObjectHasAttribute("price", $d);
        $this->assertObjectHasAttribute("id", $d);
        $this->assertObjectHasAttribute("image", $d);
    }

    /**
     * @test unauthenticated access
     * @expectedException \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function unauthenticated()
    {
        $controller = new \App\Lists\ListController();
        $controller->products_get(1);
    }
}
