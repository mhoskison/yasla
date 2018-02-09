<?php namespace App;
use Illuminate\Support\Collection;

/**
 * Created by matth on 06/02/18 at 07:27
 */
trait ResponseBase
{
    public static function map($input)
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

    public static function map_array(Collection $input)
    {
        $ret = new Collection();
        foreach ($input as $item) {
            $ret[] = self::map($item);
        }
        return $ret;
    }
}