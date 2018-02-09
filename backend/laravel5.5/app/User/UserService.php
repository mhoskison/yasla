<?php namespace App\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Created by matth on 29/01/18 at 16:36
 */
class UserService extends Model
{
    protected $table = "users";

    public function login($username, $password)
    {
        if ($id = \Auth::attempt(["email" => $username, "password" => $password], TRUE)) {
            $id = \Auth::id();
            return $id;
        }
        return 0;
    }

    /**
     * Register a new user
     *
     * @param $data
     *
     * @return int
     */
    public function register($data): int
    {
        // ---- Must register with a unique email address
        //
        if ($this->validateEmail($data["username"])) return -1;

        $this->name      = $data["firstname"] . " " . $data["lastname"];
        $this->email     = $data["username"];
        $this->password  = \Hash::make($data["password1"]);
        $this->api_token = str_random(60);
        $this->save();
        return $this->id;
    }

    public function validateEmail($email): int
    {
        $d = $this->where("email", $email)->get();
        if (count($d) !== 0) {
            return 1;
        }
        return 0;
    }
}