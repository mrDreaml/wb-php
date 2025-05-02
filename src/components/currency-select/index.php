<template shadowrootmode="open">
    <style>
        :host {
            position: relative;

            .flag-ru {
                background-image: url('/src/shared/assets/icons/flag-ru.svg');
            }

            .flag-by {
                background-image: url('/src/shared/assets/icons/flag-by.svg');
            }

            .flag-kz {
                background-image: url('/src/shared/assets/icons/flag-kz.svg');
            }

            .flag-amd {
                background-image: url('/src/shared/assets/icons/flag-amd.svg');
            }

            .flag-uzs {
                background-image: url('/src/shared/assets/icons/flag-uzs.svg');
            }

            .flag-kgs {
                background-image: url('/src/shared/assets/icons/flag-kgs.svg');
            }
        }

        .currency-select__item {
            display: flex;
            gap: .25em;
            align-items: baseline;
            background-color: rgba(255, 255, 255, .2);
            border-radius: .5em;
            padding: 0 .25em;

            .currency-select__item-flag {
                width: .75em;
                height: .75em;
                background-size: .75em;
            }

            .currency-select__item-label {
                color: #fff;
                font-size: 0.875em;
                line-height: 1.25em;
            }
        }

        .dropdown-wrapper {
            position: absolute;
            width: 300px;
            right: 0;
            z-index: 10;
        }

        .dropdown {
            cursor: default;
            margin-top: .75em;
            background-color: #fff;
            border-radius: .5em;
            padding: .75em;
            box-shadow: 0 0 1.25em rgba(0, 0, 0, .2);

            .dropdown__caption {
                font-size: 1.125em;
                margin-top: 0;
                margin-bottom: .5em;
            }

            .dropdown-list {
                margin: 0;
                padding: 0;
                list-style: none;

                li {
                    display: flex;
                    gap: .5em;
                    padding: .5em;
                    border-radius: .5em;
                    align-items: center;
                    position: relative;

                    &[active], &:hover {
                        background-color: #eee;
                    }

                    &[active]:after {
                            content: '';
                            position: absolute;
                            right: .5em;
                            mask-image: url('/src/shared/assets/icons/check.svg');
                            mask-size: 1.2em;
                            width: 1.2em;
                            height: 1.2em;
                            background-color: #000;
                    }

                    .currency-select__currency-flag {
                        font-size: 1.5em;
                        width: 1em;
                        height: 1em;
                        background-size: 1em;
                        background-position: center;
                    }

                    .currency-select__currency-code {
                        color: #868695;
                        width: 2em;
                    }
                }
            }
        }
    </style>


    <div data-id="currency-select-item" class="currency-select__item">
        <span data-id="flag" class="currency-select__item-flag flag-by"></span>
        <span data-id="code" class="currency-select__item-label">BYN</span>
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