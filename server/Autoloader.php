<?php

class Autoloader
{

    static function autoloader($classname = null)
    {
        $classname = str_replace('\\', '/', $classname);
        $path = __DIR__.'/'.$classname.'.php';
        if (file_exists($path)) {
            require_once $path;
        }
    }

}