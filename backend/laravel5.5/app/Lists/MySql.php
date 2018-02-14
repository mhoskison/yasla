<?php namespace App\Lists;

use App\Lists\Events\ProductCreated;
use App\Lists\iListModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class MySql extends Model implements iListModel
{
    protected $table = "tblList";

    /**
     * Create a new shopping list
     *
     * @param $list_name
     *
     * @return int
     */
    public function create($list_name): int
    {
        $this->label   = $list_name;
        $this->user_id = \App\Util::user_id();
        $this->save();

        \Event::fire(new \App\Product\Events\ProductCreated($this));
        return $this->id;
    }

    /**
     * Return a specific shopping list by its ID value
     *
     * @param $list_id
     *
     * @return \App\Lists\Responses\ShoppingLists
     *
     * @bug This doesn't check if the given $list_id is owned by the current user
     */
    public function get($list_id): \App\Lists\Responses\ShoppingLists
    {
        $data = $this->find($list_id);
        $ret  = \App\Lists\Responses\ShoppingLists::map($data);
        return $ret;
    }

    /**
     * Return the user's list of shopping lists
     *
     * @return Collection
     */
    public function get_all(): Collection
    {
        $user_id        = \App\Util::user_id();
        $data           = $this->where("user_id", $user_id)->get();
        $shopping_lists = \App\Lists\Responses\ShoppingLists::map_array($data);
        return $shopping_lists;

        foreach ($shopping_lists as $list) {
            $items          = self::products_get($list->id);
            $list->products = $items;
        }
    }

    /**
     * Return a list of the products associated with a shopping list
     *
     * @param $list_id
     *
     * @return mixed
     */
    public function products_get($list_id)
    {
        $sql = "SELECT
                  p.name,
                  p.price,
                  p.image,
                  pv.quantity,
                  p.id
                FROM tblListProduct pv
                LEFT JOIN tblProduct p ON p.id=pv.product_id
                WHERE pv.list_id=?";
        $rst = \DB::select($sql, [$list_id]);
        return $rst;
    }

    /**
     * Add a product to a shopping list
     *
     * @param $list_id
     * @param $product_id
     */
    public function products_add($list_id, $product_id)
    {
        $sql = "SELECT * FROM tblListProduct WHERE list_id=? AND product_id=?";
        $rst = \DB::select($sql, [$list_id, $product_id]);
        if (count($rst)) return;

        $sql = "INSERT INTO tblListProduct (list_id, product_id) VALUES (?,?)";
        \DB::insert($sql, [$list_id, $product_id]);
    }

    /**
     * Update the quantity of a product on a shopping list
     *
     * @param $list_id
     * @param $product_id
     * @param $new_quantity
     *
     * @return bool
     */
    public function products_update($list_id, $product_id, $new_quantity)
    {
        \DB::update("UPDATE tblListProduct SET quantity=? WHERE list_id=? AND product_id=?", [$new_quantity, $list_id, $product_id]);
        return TRUE;
    }

    public function remove($list_id)
    {
        \DB::delete("DELETE FROM tblList WHERE id=?", [$list_id]);
        return TRUE;
    }

    public function get_info($list_id)
    {
        $data = $this->where("id", $list_id)->get();
        $ret  = \App\Lists\Responses\ShoppingLists::map_array($data);
        return $ret;
    }

    public function purge()
    {
        \DB::delete("TRUNCATE TABLE tblList");
        \Log::debug("Table {$this->table} purged!");
    }
}