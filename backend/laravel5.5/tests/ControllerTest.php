<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class ControllerTest extends \Tests\TestCase implements iControllerTest
{

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