<?php

use JetBrains\PhpStorm\ArrayShape;

class HttpStatuses
{
    #[ArrayShape(['status' => "int"])] public static function getOkStatus(): array
    {
        return ['status' => 200];
    }

    #[ArrayShape(['status' => "int"])] public static function getCreatedStatus(): array
    {
        return ['status' => 201];
    }

    #[ArrayShape(['status' => "int"])] public static function getBadRequestStatus(): array
    {
        return ['status' => 400];
    }

    #[ArrayShape(['status' => "int"])] public static function getServerErrorStatus(): array
    {
        return ['status' => 500];
    }
}