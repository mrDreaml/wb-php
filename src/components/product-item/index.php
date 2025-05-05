<template shadowrootmode="open">
    <link rel="stylesheet" href="/src/components/product-item/index.css" />

    <section class="card">
        <div class="card__img-wrapper">
            <img src="https://basket-16.wbbasket.ru/vol2509/part250902/250902624/images/c516x688/1.webp" alt="">
            <img hidden src="https://basket-16.wbbasket.ru/vol2509/part250902/250902624/images/c516x688/2.webp" alt="">
            <img hidden src="https://basket-16.wbbasket.ru/vol2509/part250902/250902624/images/c516x688/3.webp" alt="">
            <img hidden src="https://basket-16.wbbasket.ru/vol2509/part250902/250902624/images/c516x688/4.webp" alt="">
        </div>

        <div class="card__price-block block">
            <div class="card__price card__price__red">121,84р</div>
            <del class="card__old-price">150,20р</del>
        </div>

        <h2 class="card__brand-and-category-block block">
            <div class="card__brand card__brand__verified">Instreet</div>
            <div class="card__category">/ Ботинки дерби классические</div>
        </h2>

        <div class="card__rating-and-review-block block">
            <div class="card__rating">4,8</div>
            <div class="card__reviews">24 оценки</div>
        </div>

        <a class="card__buy" href="">
            <div class="card__buy-baket"></div>
            <span>Завтра</span>
        </a>
    </section>
</template>