<?php namespace App;

/**
 * Created by matth on 31/01/18 at 17:09
 */

use Auth;

class Util
{
    /**
     * Utility method to return the ID of the currently logged in user
     *
     * @return int
     */
    public static function user_id()
    {
        return Auth::id();
    }
}