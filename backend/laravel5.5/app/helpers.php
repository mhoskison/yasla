<?php

use Illuminate\Support\Debug\HtmlDumper;
use Symfony\Component\VarDumper\Cloner\VarCloner;
use Symfony\Component\VarDumper\Dumper\CliDumper;

function stop($variable, $depth=null)
{
    \Kint::$maxLevels = $depth;
    d($variable);

    $d = debug_backtrace();
    $d = $d[0];
    print "------------------------------------------------\n";
    $file = $d["file"];
    $file = substr($file, strlen("/var/www/yasla.co.uk/backend/laravel5.5"));
    print $file . ":" . $d["line"] . "\n";
    die(1);
}