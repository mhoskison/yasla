<?php namespace App\User\UnitTests;

use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * @test logging in against the OAuth2 server using valid credentials
     */
    public function valid_credentials()
    {
        $request = $this->json("POST", "/oauth/token", [
            "grant_type"    => "password",
            "client_id"     => env("UNITTEST_OAUTH_CLIENTID"),
            "client_secret" => env("UNITTEST_OAUTH_CLIENTSECRET"),
            "username"      => env("UNITTEST_OAUTH_USERNAME"),
            "password"      => env("UNITTEST_OAUTH_PASSWORD"),
            "scope"         => "*"
        ]);

        $response = $request->assertStatus(200)->json();

        $this->assertInternalType("array", $response);
        $this->assertArrayHasKey("token_type", $response);
        $this->assertArrayHasKey("expires_in", $response);
        $this->assertArrayHasKey("access_token", $response);
        $this->assertArrayHasKey("refresh_token", $response);
    }

    /**
     * @test logging in against the OAuth2 server with invalid credentials
     */
    public function invalid_credentials()
    {
        $request = $this->json("POST", "/oauth/token", [
            "grant_type"    => "password",
            "client_id"     => env("UNITTEST_OAUTH_CLIENTID"),
            "client_secret" => env("UNITTEST_OAUTH_CLIENTSECRET"),
            "username"      => "bob",
            "password"      => "bob",
            "scope"         => "*"
        ]);

        $request->assertStatus(401);
    }

    /**
     * @test logging in against the OAuth2 server with invalid client details
     */
    public function invalid_oauth_client()
    {
        $request = $this->json("POST", "/oauth/token", [
            "grant_type"    => "password",
            "client_id"     => 24,
            "client_secret" => "can't say",
            "username"      => "bob",
            "password"      => "bob",
            "scope"         => "*"
        ]);

        $request->assertStatus(401);
    }
}
