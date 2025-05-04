<template shadowrootmode="open">
    <link rel="stylesheet" href="/src/components/base-slider/index.css" />
    <template id="template-navigation-controls">
        <div class="navigation-controls">
            <div class="navigation-controls__item"></div>
        </div>
    </template>

    <button class="navigation-slider__navigate__button" name="navigation-prev">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </svg>
    </button>
    <button class="navigation-slider__navigate__button" name="navigation-next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
    </button>

    <div class="slides-wrapper" data-id="slides-wrapper">
        <slot></slot>
    </div>
</template>