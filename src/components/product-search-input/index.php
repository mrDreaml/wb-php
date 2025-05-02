<template shadowrootmode="open">
    <link rel="stylesheet" href="/src/components/product-search-input/index.css" />

    <div class="product-search__input-wrapper">
        <input name="search-input" class="product-search__input" type="search" placeholder="Найти на Wildberries" />
        <button name="photo-button" class="product-search__icon product-search__photo-icon" type="button"></button>
        <div hidden data-id="product-search__input-controls" class="product-search__input-controls">
            <button name="clear-button" class="product-search__icon product-search__clear-icon"
                type="button"></button>
            <button name="search-button" class="product-search__icon product-search__search-icon"
                type="button"></button>
        </div>
    </div>

    <div hidden data-id="dropdown" class="product-search-dropdown">
        <div class="product-search-dropdown-body">
            <div hidden data-id="dropdown-recent-title" class="product-search-dropdown__title">Вы искали</div>
            <ul data-id="dropdown-recent" class="product-search-dropdown__list product-search-dropdown__recent">
                <template id="template-product-search-input__dropdown-recent-item">
                    <li data-dropdown-item>
                        <span></span>
                        <div data-id="btn-remove-dropdown-item" class="product-search-dropdown__x-icon"></div>
                    </li>
                </template>
            </ul>
    
            <div hidden data-id="dropdown-suggestions-title" class="product-search-dropdown__title">Часто ищут</div>
            <ul data-id="dropdown-suggestions" class="product-search-dropdown__list">
                <template id="template-product-search-input__dropdown-suggestions-item">
                    <li data-dropdown-item>
                        <span></span>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>