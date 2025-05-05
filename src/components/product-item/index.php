<template shadowrootmode="open">
    <link rel="stylesheet" href="/src/components/product-item/index.css" />

    <section class="card">
        <div class="card__img-wrapper">
            <img src="https://basket-16.wbbasket.ru/vol2509/part250902/250902624/images/c516x688/1.webp" alt="" />
            <img hidden src="https://basket-16.wbbasket.ru/vol2509/part250902/250902624/images/c516x688/2.webp" alt="" />
            <img hidden src="https://basket-16.wbbasket.ru/vol2509/part250902/250902624/images/c516x688/3.webp" alt="" />
            <img hidden src="https://basket-16.wbbasket.ru/vol2509/part250902/250902624/images/c516x688/4.webp" alt="" />
            <button class="card__like-button"></button>
            <div class="card__preview-wrapper">
                <div class="card__preview">Быстрый просмотр</div>
            </div>
        </div>

        <div class="card__price-block block">
            <div class="card__price card__price__red"><?= number_format($product["price"], 2, ',') ?>р.</div>
            <del class="card__old-price"><?= number_format($product["old_price"], 2, ',') ?>р</del>
        </div>

        <h2 class="card__brand-and-category-block block">
            <div class="card__brand card__brand__verified"><?= $product["brand"] ?></div>
            <div class="card__category">/ <?= $product["title"] ?></div>
        </h2>

        <div class="card__rating-and-review-block block">
            <div class="card__rating"><?= number_format($product["rating"], 1, ',') ?></div>
            <div class="card__reviews"><?= number_format($product["reviews_count"], 0, '', ' ') ?> оценки</div>
        </div>

        <a class="card__buy" href="<?= $product["url"] ?>">
            <div class="card__buy-basket"></div>
            <span>Завтра</span>
        </a>
    </section>
</template>