<?php

use Illuminate\Http\Request;

Route::middleware(["auth:api"])->group(function () {
    new \App\Lists\Router();
    new \App\Search\Router();
    new \App\Product\Router();

    Route::get("/user", function (Request $request) {
        return $request->user();
    });
});

// ---- Unauthenticated routes
//
new \App\User\Router();