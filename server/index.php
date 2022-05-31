<?php
require_once 'Autoloader.php';
spl_autoload_register(['Autoloader', 'autoloader']);

Cors::enableCors();

$stock = new Stock();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stock->getAll();
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stock->create($_POST['title'], $_POST['price'], $_POST['date_and_time']);
}
