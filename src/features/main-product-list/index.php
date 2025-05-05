<?php 
class MainProductList {
    private $productListData = array();
    public function __construct() {
        $this->productListData = json_decode(file_get_contents('src/mocks/randomProductList.json'), true);
    }

    public function getProductListData() {
        return $this->productListData;
    }
}
?>