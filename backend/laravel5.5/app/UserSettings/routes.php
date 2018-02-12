<?php namespace App\UserSettings;

/**
 * Created by matth on 29/01/18 at 15:50
 */
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;


class Routes extends \App\RouterBase
{
    public function __construct()
    {
        \Route::get("settings", function () {
            /**
             * @var $controller \App\UserSettings\Controller
             */
            $container  = app();
            $controller = $container->make(\App\UserSettings\Controller::class);
            $ret        = $controller->profile();
            return response()->json($ret);
        });
        \Route::post("settings/update", function () {
            /**
             * @var $controller \App\UserSettings\Controller
             */

            $name       = \Request::input("name");
            $value      = \Request::input("value");
            $container  = app();
            $controller = $container->make(\App\UserSettings\Controller::class);
            $ret        = $controller->set($name, $value);
            return response()->json($ret);
        });
    }
}