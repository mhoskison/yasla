<?php namespace Tests\Unit\User;

use \App\Http\Controllers\ListsController;
use App\Lists\MySql;
use Tests\TestCase;
use Illuminate\Support\Facades\Event;


class registerTest extends \Tests\TransactionTest
{
    /**
     * @test registering a new user
     */
    public function register()
    {
        $controller = new \App\Http\Controllers\UserController();
        $id         = $controller->register([
            "firstname" => "Test",
            "lastname"  => "User",
            "username"  => "test@user.com",
            "password1" => "testpassword",
            "password2" => "testpassword"
        ]);
        $this->assertGreaterThan(0, $id);
    }
}
