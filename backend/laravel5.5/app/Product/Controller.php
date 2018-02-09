<?php namespace App\Product;

class Controller extends \App\Http\Controllers\Controller
{
    use \App\AuthenticatedApiRoute;

    /**
     * @var \App\Product\ProductModel
     */
    public $model;

    /**
     * Product controller constructor.
     *
     * @param \App\Product\ProductModel|NULL $model
     */
    public function __construct(\App\Product\ProductModel $model = NULL)
    {
        if (!$model) $model = new \App\Product\ProductModel();
        $this->model = $model;
    }

    /**
     * Create a new product
     *
     * @return \Illuminate\Support\Collection
     */
    public function create(\App\Product\ProductDescription $description): int
    {
        $this->ProtectController();
        $product_id = $this->model->create($description);
        return $product_id;
    }

    /**
     * Add a product to a shopping list
     */
    public function addToList($list_id, $product)
    {
        $this->ProtectController();
        $status = $this->model->addToList($list_id, $product);
        return $status;
    }
}