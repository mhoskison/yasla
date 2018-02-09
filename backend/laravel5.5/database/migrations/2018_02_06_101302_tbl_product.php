<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TblProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblProduct', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("user_id");
            $table->string("name");
            $table->decimal("price", 10, 4);
            $table->string("description")->nullable();
            $table->string("promotion")->nullable();
            $table->string("image")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop("tblProduct");
    }
}
