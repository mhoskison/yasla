<?php namespace App\Search;

use App\Lists\Events\ProductCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Created by matth on 29/01/18 at 16:36
 */
class SearchService extends Model
{
    public function search($term)
    {
        $return_fake = FALSE;

        if ($return_fake)
            return [
                [
                    "image"                    => "http://img.tesco.com/Groceries/pi/639/5052319711639/IDShot_90x90.jpg",
                    "superDepartment"          => "Food Cupboard",
                    "tpnb"                     => 51627961,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Baked beans in tomato sauce"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any peas, sprouts or beans",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Tesco Everyday Value Baked Beans In Tomato Sauce 420G",
                    "AverageSellingUnitWeight" => 0.425,
                    "id"                       => "258290127",
                    "ContentsQuantity"         => 420.0,
                    "department"               => "Tins, Cans & Packets",
                    "price"                    => 0.25,
                    "unitprice"                => 0.595,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ], [
                    "image"                    => "http://img.tesco.com/Groceries/pi/859/0000010063859/IDShot_90x90.jpg",
                    "superDepartment"          => "Fresh Food",
                    "tpnb"                     => 54795174,
                    "UnitOfSale"               => 1,
                    "description"              => [
                        0 => "Green beans"
                    ],
                    "UnitQuantity"             => "KG",
                    "PromotionDescription"     => "25 extra points on any fresh spinach, cabbage or greens",
                    "ContentsMeasureType"      => "G",
                    "name"                     => "Redmere Farms Green Beans 220G",
                    "AverageSellingUnitWeight" => 0.332,
                    "id"                       => "258491673",
                    "ContentsQuantity"         => 220.0,
                    "department"               => "Fresh Vegetables",
                    "price"                    => 0.8,
                    "unitprice"                => 4.05,
                ]
            ];


        $client = new \GuzzleHttp\Client();

        $request  = $client->request("GET", "https://dev.tescolabs.com/grocery/products/?query={$term}&offset=0&limit=10", [
            "headers" => [
                "Ocp-Apim-Subscription-Key" => env("TESCO_KEY")
            ]
        ]);
        $response = $request->getBody();
        $data     = json_decode($response->getContents(), TRUE);
        $results  = $data["uk"]["ghs"]["products"]["results"];
        return $results;
    }
}