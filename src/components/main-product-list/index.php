<template shadowrootmode="open">
    <link rel="stylesheet" href="/src/components/main-product-list/index.css" />
    <?php 
    require 'src/features/main-product-list/index.php';
    $mainProductList = new MainProductList();
    $products = $mainProductList->getProductListData();
    foreach ($products as $product):
    ?>
        <product-item><?php include 'src/components/product-item/index.php' ?></product-item>
    <?php endforeach; ?>
</template>