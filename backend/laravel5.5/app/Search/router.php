<?php namespace App\Search;

/**
 * Created by matth on 29/01/18 at 15:50
 */
use App\Http\Controllers\SearchController;

class Router extends \App\RouterBase
{
    public function __construct()
    {
        \Route::post("search", function () {
            /**
             * @var $controller \App\Http\Controllers\SearchController
             */
            $term       = \Request::get("term");
            $container  = app();
            $controller = $container->make(SearchController::class);
            $ret        = $controller->search($term);
            return response()->json($ret);
        });
    }
}