<?php namespace App\User;

/**
 * Created by matth on 29/01/18 at 15:50
 */
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;

class Routes extends \App\RouterBase
{
    public function __construct()
    {
        \Route::post("settings/update", function () {
            /**
             * @var $controller UserController
             */

            $name       = \Request::input("name");
            $value      = \Request::input("value");
            $container  = app();
            $controller = $container->make(UserController::class);
            $ret        = $controller->settings_update($name, $value);
            return response()->json($ret);
        });
    }
}