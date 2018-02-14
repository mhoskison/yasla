<?php namespace Tests\Unit\UserSettings;

class profile_Test extends \Tests\TransactionTest
{
    /**
     * @test getting a user's profile
     */
    public function profile()
    {
        \Auth::loginUsingId(1);
        $ctrl = new \App\UserSettings\Controller();
        $d    = $ctrl->profile();

        $this->assertInternalType("array", $d);
        $this->assertArrayHasKey("user_id", $d);
        $this->assertArrayHasKey("user_email", $d);
        $this->assertArrayHasKey("user_name", $d);
    }
}
