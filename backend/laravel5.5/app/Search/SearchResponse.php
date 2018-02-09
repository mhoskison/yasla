<?php namespace App\Responses;
/**
 * Created by matth on 30/01/18 at 08:14
 */
class SearchResponse
{
    public $label;
    public $user_id;
    public $id;
    public $cost;
    public $lastused;

    public static function map(\App\Lists\SearchService $input)
    {
        $ret   = new self();
        $attrs = $input->getAttributes();
        foreach ($attrs as $a => $b) {
            if (property_exists($ret, $a)) {
                $ret->$a = $b;
            }
        }
        return $ret;
    }
}