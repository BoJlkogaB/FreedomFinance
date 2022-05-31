<?php

class Stock
{

    private Database $database;

    private array $errors;

    public function __construct()
    {
        $this->database = new Database();
    }

    public function create($title, $price, $dateAndTime)
    {
        $title = $this->database->escape($title);
        $dateAndTime = $this->getMySqlDate($dateAndTime);

        if ($this->isValidData($title, $price, $dateAndTime)) {
            try {
                $this->database->request("INSERT INTO `stock` (`title`, `price`, `date_and_time`) VALUES ('$title','$price','$dateAndTime')");
                $this->getResponse(HttpStatuses::getCreatedStatus());
            } catch (ErrorException $exception) {
                $this->getResponse(HttpStatuses::getServerErrorStatus());
            }
        } else {
            $this->getResponse(HttpStatuses::getBadRequestStatus(), 'errors',
              json_encode($this->errors));
        }
    }

    public function getAll()
    {
        $data = mysqli_fetch_all($this->database->request("SELECT * FROM `stock` ORDER BY date_and_time ASC"),
          MYSQLI_ASSOC);
        $this->getResponse(HttpStatuses::getOkStatus(), 'response', $data);
    }

    private function getResponse($httpStatus, $key = null, $value = null)
    {
        $response = $httpStatus;
        if (isset($key) && isset($value)) {
            $response[$key] = $value;
        }
        echo json_encode($response);
    }

    private function getMySqlDate($dateAndTime): ?string
    {
        return $dateAndTime ? date('Y-m-d H:i:s',
          strtotime($dateAndTime)) : null;
    }

    private function isValidData($title, $price, $dateAndTime): bool
    {
        $titleIsValid = $this->titleIsValid($title);
        $priceIsValid = $this->priceIsValid($price);
        $dateTimeIsValid = $this->dateTimeIsValid($dateAndTime);

        return $titleIsValid && $priceIsValid && $dateTimeIsValid;
    }

    private function titleIsValid($title): bool
    {
        if (strlen($title) < 1 || strlen($title) > 255) {
            $this->errors['title'] = 'invalid';

            return false;
        }

        return true;
    }

    private function priceIsValid($price): bool
    {
        if ($price <= 0 || $price > 100000 || !is_numeric($price)) {
            $this->errors['price'] = 'invalid';

            return false;
        }

        return true;
    }

    private function dateTimeIsValid($dateTime): bool
    {
        if (!isset($dateTime)) {
            $this->errors['date_and_time'] = 'invalid';

            return false;
        }

        return true;
    }

}