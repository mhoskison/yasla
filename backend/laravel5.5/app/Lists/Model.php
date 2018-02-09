<?php namespace App\Lists;

use App\Lists\Events\ProductCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Created by matth on 29/01/18 at 16:36
 */
class ListService extends Model
{
    protected $table = "tblList";

    public function purge()
    {
        \DB::delete("TRUNCATE TABLE tblList");
        \Log::debug("Table {$this->table} purged!");
    }

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
     */
    public function get_by_id($list_id): \App\Lists\Responses\ShoppingLists
    {
        $data = $this->find($list_id);
        $ret  = \App\Lists\Responses\ShoppingLists::map($data);
        return $ret;
    }

    public function remove($list_id)
    {
        \DB::delete("DELETE FROM tblList WHERE id=?", [$list_id]);
        return TRUE;
    }

    public function get_shopping_list_items($list_id)
    {
        $sql = "SELECT
  l.label,
  p.name,
  p.price,
  p.image,
  pv.quantity
FROM
  tblList l
  LEFT JOIN tblListProduct pv ON pv.list_id=l.id
  LEFT JOIN tblProduct p ON p.id=pv.product_id

WHERE l.id=?";
        $rst = \DB::select($sql, [$list_id]);
        return $rst;
    }

    /**
     * Return the user's list of shopping lists
     *
     * @return \Illuminate\Support\Collection
     */
    public function get_list(): \Illuminate\Support\Collection
    {
        $user_id        = \App\Util::user_id();
        $data           = $this->where("user_id", $user_id)->get();
        $shopping_lists = \App\Lists\Responses\ShoppingLists::map_array($data);

        foreach ($shopping_lists as $list) {
            $items          = self::get_shopping_list_items($list->id);
            $list->products = $items;
        }
        return $shopping_lists;
    }

    public function get_info($list_id)
    {
        $data = $this->where("id", $list_id)->get();
        $ret  = \App\Lists\Responses\ShoppingLists::map_array($data);
        return $ret;
    }

    public function get_products($list_id)
    {
        $obj  = new \App\Product\Controller();
        $info = self::get_info($list_id);

        return [
            "list"     => $info[0],
            "products" => $this->get_shopping_list_items($list_id)
        ];
    }

    /**
     * Add a product to a shopping list
     *
     * @param $list_id
     * @param $product_id
     */
    public function add_product($list_id, $product_id)
    {
        $sql = "SELECT * FROM tblListProduct WHERE list_id=? AND product_id=?";
        $rst = \DB::select($sql, [$list_id, $product_id]);
        if (count($rst)) return;

        $sql = "INSERT INTO tblListProduct (list_id, product_id) VALUES (?,?)";
        \DB::insert($sql, [$list_id, $product_id]);
    }
}