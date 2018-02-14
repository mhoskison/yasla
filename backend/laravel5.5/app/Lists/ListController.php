<?php namespace App\Lists;

use App\Lists\iListModel;
use App\Lists\MySql;
use App\Product\ProductDescription;
use Illuminate\Support\Collection;

class ListController extends \App\Http\Controllers\Controller
{
    use \App\AuthenticatedApiRoute;

    /**
     * @var MySql
     */
    public $model;

    /**
     * Create a new shopping list
     *
     * @param $list_name
     *
     * @return int
     * @see \Tests\Unit\Lists\create_Test
     */
    public function create($list_name): int
    {
        $this->ProtectController();

        $data = $this->model->create($list_name);
        return $data;
    }

    /**
     * Return a shopping list by its ID
     *
     * @param $list_id
     *
     * @return Responses\ShoppingLists
     * @see \Tests\Unit\Lists\get_Test
     */
    public function get($list_id)
    {
        $this->ProtectController();

        $data = $this->model->get($list_id);
        return $data;
    }

    /**
     * Return a list of the user's shopping lists
     *
     * @return Collection
     * @see \Tests\Unit\Lists\get_all_Test
     */
    public function get_all(): Collection
    {
        $this->ProtectController();

        $data = $this->model->get_all();
        return $data;
    }

    /**
     * Return a list of the products associated with a shopping list
     *
     * @param $list_id
     *
     * @return array
     * @see \Tests\Unit\Lists\get_products_Test
     */
    public function products_get($list_id)
    {
        $this->ProtectController();

        $list = self::get_info($list_id);
        return [
            "list"     => $list[0],
            "products" => $this->model->products_get($list_id)
        ];
    }

    /**
     * Add a product to a shopping list
     *
     * @param int                $list_id
     * @param ProductDescription $description
     *
     * @return int
     * @see \Tests\Unit\Lists\add_product_Test
     */
    public function products_add($list_id, ProductDescription $description)
    {
        $this->ProtectController();

        $product    = new \App\Product\Controller();
        $product_id = $product->create($description);
        $this->model->products_add($list_id, $product_id);
        return $product_id;
    }

    public function products_update($list_id, $product_id, $quantity)
    {
        $this->ProtectController();

        $status = $this->model->products_update($list_id, $product_id, $quantity);
        return $status;
    }

    /**
     * Delete a shopping list
     *
     * @param $list_id
     *
     * @return int
     * @see \Tests\Unit\Lists\delete_Test
     */
    public function remove($list_id): int
    {
        $this->ProtectController();

        $data = $this->model->remove($list_id);
        return $data;
    }

    public function purge()
    {
        $this->ProtectController();

        $this->model->purge();
    }

    /**
     * ListsController constructor.
     *
     * @param \App\Lists\iListModel $model
     */
    public function __construct(iListModel $model = NULL)
    {
        if (!$model) $model = new \App\Lists\MySql();
        $this->model = $model;
    }

    /**
     * Return basic info for a shopping list
     *
     * @return Collection
     * @see \Tests\Unit\Lists\get_info_Test
     */
    public function get_info($list_id)
    {
        $this->ProtectController();

        $data = $this->model->get_info($list_id);
        return $data;
    }

}