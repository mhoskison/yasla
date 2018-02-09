<?php namespace Tests\Unit\Lists;

class createTest extends \Tests\TransactionTest
{
    public function testCreate()
    {
        \Auth::loginUsingId(1);

        $controller = new \App\Lists\Controller();
        $id         = $controller->create("A test list");
        $this->assertGreaterThan(0, $id);

        // ---- Now get the results
        //
        $data = $controller->get_by_id($id);
        $this->assertInstanceOf("\App\Lists\Responses\ShoppingLists", $data);

        $this->assertEquals($id, $data->id);
        $this->assertEquals("A test list", $data->label);
    }
}
