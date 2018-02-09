<?php namespace App;

trait AuthenticatedApiRoute
{
    public function ProtectController() {
        $user_id = \App\Util::user_id();
        if (!$user_id) abort(401);
    }
    public function bad__call($method, $args)
    {
        $requires_authentication = TRUE;
        $class = get_class($this);

        // ---- Use reflection to get the target method's docblock
        //
        $mirror = new \ReflectionClass($this);
        try {
            $glass    = $mirror->getMethod($method);
            $docblock = $glass->getDocComment();

            // ---- If the docblock includes the annotaion [UNAUTHENTICATED] then perform no further access checks
            //
            preg_match("/\[UNAUTHENTICATED\]/", $docblock, $matches, PREG_OFFSET_CAPTURE, 0);
            if (count($matches) > 0) {
                $requires_authentication = FALSE;
            }

            // ---- If the method requires authentication, ensure we've got a valid user ID
            //
            if ($requires_authentication) {
                $user_id = \App\Util::user_id();
                if (!$user_id) {
                    \Log::error("Attempt to access authenticated method $class::$method");
                    abort(403);
                }
            }

            \Log::info("**** [$user_id] Calling $class::$method!");
            call_user_func_array([$this, $method], $args);
        } catch (\Exception $e) {
            print $e->getMessage() . "\n";
        }
    }
}