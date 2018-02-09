<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class)->create(['email' => 'johndoe@scotch.io']);

// database/seeds/TodosTableSeeder.php


// database/seeds/DatabaseSeeder.php

    }
}