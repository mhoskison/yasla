<?php namespace App\Lists\Responses;

/**
 * Created by matth on 30/01/18 at 08:14
 */
class ShoppingLists
{
    use \App\ResponseBase;

    public $label;
    public $user_id;
    public $id;
    public $cost;
    public $lastused;
}