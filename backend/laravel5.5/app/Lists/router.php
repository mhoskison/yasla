<?php namespace App\Lists;

class Router extends \App\RouterBase
{
    /**
     * @var \App\Lists\Controller
     */
    private $controller;

    public function __construct()
    {
        $container        = app();
        $this->controller = $container->make(\App\Lists\Controller::class);

        /**
         * Create a new shopping list
         */
        \Route::post("lists/create", function () {
            $data      = \Request::get("data");
            $list_name = $data["list_name"];

            $ret = $this->controller->create($list_name);
            return response()->json($ret);
        });

        /**
         * Return a list of shopping lists
         */
        \Route::get("lists/get", function () {
            $ret = $this->controller->get_list();
            return response()->json($ret);
        });

        /**
         * Return the products on a shopping list
         */
        \Route::get("lists/{list_id}/products", function ($list_id) {
            $ret = $this->controller->get_products($list_id);
            return response()->json($ret);
        });

        /**
         * Delete a shopping list
         */
        \Route::post("lists/{list_id}/delete", function ($list_id) {
            $ret = $this->controller->remove($list_id);
            return response()->json($ret);
        });

        /**
         *
         */
        \Route::get("lists/{list_id}/info", function ($list_id) {
            $ret = $this->controller->get_info($list_id);
            return response()->json($ret);
        });

        /**
         * Update the quantity of a product on a shopping list
         */
        \Route::post("list/{list_id}/product/{product_id}/update-quantity/{quantity}", function ($list_id, $product_id, $quantity) {
            $ret = $this->controller->update_quantity($list_id, $product_id, $quantity);
            return response()->json($ret);
        });

    }
}