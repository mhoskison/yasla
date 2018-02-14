<?php namespace Tests\Unit\User;

use \App\Http\Controllers\ListsController;
use App\Lists\MySql;
use Tests\TestCase;

class validateEmailTest extends \Tests\TransactionTest
{
    /**
     * @test a duplicate email address
     */
    public function duplicate()
    {
        $controller = new  \App\Http\Controllers\UserController();
        $d          = $controller->validateEmail("matt@hoskison.co.uk");
        $this->assertEquals(1, $d);
    }

    /**
     * @test a unique email address
     */
    public function unique()
    {
        $controller = new  \App\Http\Controllers\UserController();
        $d          = $controller->validateEmail("bill@microsoft.com");
        $this->assertEquals(0, $d);
    }
}
