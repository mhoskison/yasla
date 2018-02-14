<?php namespace App\Lists;

interface iListModel
{
    public function create($list_name);

    public function get($list_id);

    public function get_all(): \Illuminate\Support\Collection;

    public function products_add($list_id, $product_id);

    public function products_get($list_id);

    public function products_update($list_id, $product_id, $new_quantity);

    public function remove($list_id);

    public function purge();
}