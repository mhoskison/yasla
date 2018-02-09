<?php namespace App\Product;

class Router extends \App\RouterBase
{
    /**
     * @var \App\Product\Controller
     */
    private $controller;

    public function __construct()
    {
        $container        = app();
        $this->controller = $container->make(\App\Product\Controller::class);

        \Route::post("product/add-to-list/{list_id}", function ($list_id) {
            $product = \Request::input("data");
            $ret     = $this->controller->addToList($list_id, $product);
            return response()->json($ret);
        });
    }
}