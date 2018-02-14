<?php namespace App\Http\Controllers;

/**
 * Created by matth on 29/01/18 at 15:53
 */

use \App\User\UserService;


class UserController extends Controller
{
    use \App\AuthenticatedApiRoute;

    /**
     * @var \App\User\UserService
     */
    private $model;

    public function __construct(UserService $model = NULL)
    {
        if (!$model) $model = new \App\User\UserService();
        $this->model = $model;
    }

    public function login($username, $password)
    {
        return $this->model->login($username, $password);
    }

    /**
     * Register a new user account
     *
     * @param $data
     *
     * Required parameters in $data:
     *      firstname
     *      lastname
     *      username
     *      password1
     *
     * @return int
     */
    public function register($data)
    {
        $user_id = $this->model->register($data);
        if ($user_id === -1) {
            \Log::error("Attempt to register with duplicate email address: [{$data['username']}");
            return -1;
        }

        // ---- The user account has been created but the user has not logged in, so we need to fake the login
        //      here to call other controllers
        \Auth::loginUsingId($user_id);

        // ---- Create an empty default shopping list
        //
        $listController = new \App\Lists\ListController();
        $listController->create("Default");

        // ---- Let anyone interested know about the new user
        //
        Event(new \App\User\Events\UserRegistered($this->model));

        // ---- Return the new user's ID
        //
        return $user_id;
    }

    public function validateEmail($data)
    {
        return $this->model->validateEmail($data);
    }


}