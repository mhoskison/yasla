<?php namespace Tests\Unit\Search;

use \App\Http\Controllers\ListsController;
use App\Lists\ListService;
use Tests\TestCase;

class searchTest extends \Tests\TransactionTest
{
    public function testSearch()
    {
        /**
         * @var $controller \App\Http\Controllers\SearchController
         */

        $container  = app();
        $controller = $container->make(\App\Http\Controllers\SearchController::class);

        $d = $controller->search("beans");
        $this->assertInternalType("array", $d);
        $this->assertCount(10, $d);
    }
}
