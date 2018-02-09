<?php namespace App\Product;

use App\Lists\Events\ProductCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Created by matth on 29/01/18 at 16:36
 */
class ProductModel extends Model
{
    protected $table = "tblProduct";

    /**
     * Create a new product
     *
     * @param $list_name
     *
     * @return int
     */
    public function create(\App\Product\ProductDescription $description): int
    {
        if (is_array($description->description)) $description->description = $description->description[0];
        $this->id          = $description->id;
        $this->name        = $description->name;
        $this->description = $description->description;
        $this->promotion   = $description->promotion;
        $this->image       = $description->image;
        $this->price       = $description->price;
        $this->user_id     = \App\Util::user_id();
        $this->save();

        \Event::fire(new \App\Product\Events\ProductCreated($this));
        return $this->id;
    }

    public function addToList($list_id, $product)
    {
        $user_id    = \App\Util::user_id();
        $product_id = $product["id"];

        // ---- If the product doesn't already exist, add it first
        //
        if (!self::exists($product_id)) {
            $desc = new ProductDescription();
            foreach ($product as $key => $value) {
                $desc->$key = $value;
            }
            self::create($desc);
        }


        // ---- If the product is already on the shopping list, increment its quantity, otherwise add it
        //
        $sql = "SELECT * FROM tblListProduct WHERE list_id=? AND product_id=?";
        $rst = \DB::select($sql, [$list_id, $product_id]);
        if (count($rst) > 0) {
            $quantity = $rst[0]->quantity + 1;
            $sql      = "UPDATE tblListProduct SET quantity=? WHERE list_id=? AND product_id=?";
            \DB::update($sql, [$quantity, $list_id, $product]);
        } else {
            $sql = "INSERT INTO tblListProduct (list_id, product_id) VALUES (?,?)";
            \DB::insert($sql, [$list_id, $product_id]);
        }
    }

    private static function exists($product_id)
    {
        $sql = "SELECT * FROM tblProduct WHERE id=?";
        $rst = \DB::select($sql, [$product_id]);
        if (count($rst) === 0) return FALSE;
        return TRUE;
    }
}