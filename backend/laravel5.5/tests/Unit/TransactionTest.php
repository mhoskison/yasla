<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

/**
 * Class TransactionTest forces unit tests to be run inside a database transaction
 *
 * @package Tests
 */
abstract class TransactionTest extends TestCase
{
    use CreatesApplication;

    public function setup()
    {
        parent::setup();
        \DB::beginTransaction();
    }

    public function tearDown()
    {
        parent::tearDown();
//        \DB::rollback();
    }
}
