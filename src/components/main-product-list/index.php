<template shadowrootmode="open">
    <link rel="stylesheet" href="/src/components/main-product-list/index.css" />
    <?php for ($i = 0; $i < 12; $i++): ?>
        <product-item><?php include 'src/components/product-item/index.php' ?></product-item>
    <?php endfor; ?>
</template>