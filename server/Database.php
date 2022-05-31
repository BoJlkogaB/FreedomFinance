<?php

class Database
{

    private mysqli|null|false $connect;

    private string $host = 'localhost:8889';

    private string $user = 'root';

    private string $password = 'root';

    private string $database = 'FreedomFinance';

    public function __construct()
    {
        $this->connect = mysqli_connect($this->host, $this->user,
          $this->password,
          $this->database) or error_log(("Error".mysqli_error($this->connect)));
    }

    public function escape($value): string
    {
        return mysqli_real_escape_string($this->connect, $value);
    }

    public function request($query): mysqli_result|bool
    {
        $result = mysqli_query($this->connect,
          $query) or error_log(("Error".mysqli_error($this->connect)));

        return $result;
    }

}