<template shadowrootmode="open">
    <link rel="stylesheet" href="/src/components/currency-select/index.css" />  

    <div data-id="currency-select-item" class="currency-select__item">
        <span data-id="flag" class="currency-select__item-flag flag-ru"></span>
        <span data-id="code" class="currency-select__item-label">RUB</span>
    </div>

    <div hidden data-id="dropdown" class="dropdown-wrapper">
        <div class="dropdown">
            <h2 class="dropdown__caption">Валюта</h2>
            <ul class="dropdown-list">
                <li data-id="dropdown-item" data-currency="ru">
                    <span class="currency-select__currency-flag flag-ru"></span>
                    <span class="currency-select__currency-code">RUB</span>
                    <span>Российский Рубль</span>
                </li>
                <li data-id="dropdown-item" data-currency="by">
                    <span class="currency-select__currency-flag flag-by"></span>
                    <span class="currency-select__currency-code">BYN</span>
                    <span>Белорусский Рубль</span>
                </li>
                <li data-id="dropdown-item" data-currency="kz">
                    <span class="currency-select__currency-flag flag-kz"></span>
                    <span class="currency-select__currency-code">KZT</span>
                    <span>Казахстанский тенге</span>
                </li>
                <li data-id="dropdown-item" data-currency="amd">
                    <span class="currency-select__currency-flag flag-amd"></span>
                    <span class="currency-select__currency-code">AMD</span>
                    <span>Армянский драм</span>
                </li>
                <li data-id="dropdown-item" data-currency="kgs">
                    <span class="currency-select__currency-flag flag-kgs"></span>
                    <span class="currency-select__currency-code">KGS</span>
                    <span>Кыргызский сом</span>
                </li>
                <li data-id="dropdown-item" data-currency="uzs">
                    <span class="currency-select__currency-flag flag-uzs"></span>
                    <span class="currency-select__currency-code">UZS</span>
                    <span>Узбекский сум</span>
                </li>
            </ul>
        </div>
    </div>
</template>