<?php namespace App\Lists;

class Controller extends \App\Http\Controllers\Controller
{
    use \App\AuthenticatedApiRoute;
    public $model;

    /**
     * ListsController constructor.
     *
     * @param ListService|NULL $lists
     */
    public function __construct(ListService $lists = NULL)
    {
        if (!$lists) $lists = new \App\Lists\ListService();
        $this->model = $lists;
    }

    /**
     * Return a list of the user's shopping lists
     *
     * @return \Illuminate\Support\Collection
     */
    public function get_list()
    {
        $this->ProtectController();

        $data = $this->model->get_list();
        return $data;
    }

    /**
     * Return basic info for a shopping list
     *
     * @return \Illuminate\Support\Collection
     */
    public function get_info($list_id)
    {
        $this->ProtectController();

        $data = $this->model->get_info($list_id);
        return $data;
    }

    /**
     * Return a list of the products associated with a shopping list
     *
     * @param $list_id
     *
     * @return array
     */
    public function get_products($list_id)
    {
        $this->ProtectController();

        $data = $this->model->get_products($list_id);
        return $data;
    }

    public function get_by_id($list_id)
    {
        $this->ProtectController();

        $data = $this->model->get_by_id($list_id);
        return $data;
    }

    /**
     * @param $list_name
     *
     * @return int
     *
     */
    public function create($list_name): int
    {
        $this->ProtectController();

        $data = $this->model->create($list_name);
        return $data;
    }

    /**
     * Add a product to a shopping list
     *
     * @param $list_id
     * @param $product_id
     *
     * @return
     */
    public function add_product($list_id, \App\Product\ProductDescription $description)
    {
        $this->ProtectController();

        $product    = new \App\Product\Controller();
        $product_id = $product->create($description);

        $data = $this->model->add_product($list_id, $product_id);
        return $product_id;
    }

    /**
     * Delete a shopping list
     *
     * @param $list_id
     *
     * @return int
     *
     */
    public function remove($list_id): int
    {
        $this->ProtectController();

        $data = $this->model->remove($list_id);
        return $data;
    }

    public function update_quantity($list_id, $product_id, $quantity)
    {
        $this->ProtectController();

        $status = $this->model->update_quantity($list_id, $product_id, $quantity);
        return $status;
    }


    public function purge()
    {
        $this->ProtectController();

        $this->model->purge();
    }
}