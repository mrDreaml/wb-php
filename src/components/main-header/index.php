<template shadowrootmode="open">
    <link rel="stylesheet" href="/src/components/main-header/index.css" />

    <header data-id="main-header" class="main-header">
        <div class="main-header__container">
            <div data-id="main-header-top" class="main-header__top">
                <nav class="main-header__top-navigation">
                    <div class="main-header__location">
                        <a class="main-header__link" href="/">Минск</a>
                    </div>
                    <div class="main-header__offers-links">
                        <a class="main-header__link" href="/">Продавайте на Wildberries</a>
                        <a class="main-header__link" href="/">Работа в Wildberries</a>
                    </div>
                </nav>
                <currency-select value="ru">
                    <?php include 'src/components/currency-select/index.php' ?>
                </currency-select>
            </div>
            <div class="main-header__bottom">
                <a href="/">
                    <img src="/src/shared/assets/logoWb.svg" alt="wildberries" />
                </a>
                <animated-button-burger-menu>
                    <?php include 'src/components/animated-button-burger-menu/index.php' ?>
                </animated-button-burger-menu>
                <product-search-input>
                    <?php include 'src/components/product-search-input/index.php' ?>
                </product-search-input>
                <nav class="main-header__navigation">
                    <a href="/" class="main-header__link-icon-item main-header__link">
                        <div class="main-header__link-icon main-header__link-icon-address"></div>
                        Адреса
                    </a>
                    <a href="/" class="main-header__link-icon-item main-header__link">
                        <div class="main-header__link-icon main-header__link-icon-login"></div>
                        Войти
                    </a>
                    <a href="/" class="main-header__link-icon-item main-header__link">
                        <div class="main-header__link-icon main-header__link-icon-basket"></div>
                        Корзина
                    </a>
                </nav>
            </div>
        </div>
    </header>

    <script type="module" src="/src/components/main-header/index.js"></script>
</template>