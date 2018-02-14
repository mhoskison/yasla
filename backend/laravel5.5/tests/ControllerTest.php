<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class ControllerTest extends \Tests\TestCase implements iControllerTest
{
    public function setup()
    {
        parent::setUp();
        \DB::beginTransaction();
    }

    public function tearDown()
    {
        \DB::rollBack();
        parent::tearDown();
    }
}

interface iControllerTest
{
    /**
     * @test unauthenticated access
     * @expectedException \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function unauthenticated();

    public function success();
}