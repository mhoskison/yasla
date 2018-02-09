<?php namespace App\Http\Controllers;

/**
 * Created by matth on 29/01/18 at 15:53
 */

use \App\Search\SearchService;


class SearchController extends Controller
{

    private $model;

    public function __construct(SearchService $model)
    {
        $this->model = $model;
    }

    public function search($term)
    {
        $data = $this->model->search($term);
        return $data;
    }

}