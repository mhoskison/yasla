<?php namespace App\User;

/**
 * Created by matth on 29/01/18 at 15:50
 */
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;

class Router extends \App\RouterBase
{
    public function __construct()
    {
        \Route::get("ping", function () {
            return "pong";
        });

        \Route::post("user/register", function () {
            /**
             * @var $controller \App\Http\Controllers\UserController
             */
            \Log::debug("About to register a user!");

            $data       = \Request::input("data");
            $container  = app();
            $controller = $container->make(UserController::class);
            $ret        = $controller->register($data);
            return response()->json($ret);
        });

        \Route::post("user/validate-email", function () {
            /**
             * @var $controller UserController
             */

            $email      = \Request::input("email");
            $container  = app();
            $controller = $container->make(UserController::class);
            $ret        = $controller->validateEmail($email);
            return response()->json($ret);
        });


    }
}