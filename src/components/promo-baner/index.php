<template shadowrootmode="open">
  <link rel="stylesheet" href="/src/components/promo-baner/index.css" />
  <base-slider class="promo-baner__slider" height="170" infinity shrink="50" gap="10" autoplay>
    <?php include 'src/components/base-slider/index.php' ?>
    <slider-item class="slide-item">
      <?php include 'src/components/slider-item/index.php' ?>
      <img src="/src/shared/assets/banners/2880x336_1.webp" alt="" />
    </slider-item>

    <slider-item class="slide-item">
      <?php include 'src/components/slider-item/index.php' ?>
      <img src="/src/shared/assets/banners/spring_2880.webp" alt="" />
    </slider-item>

    <slider-item class="slide-item">
      <?php include 'src/components/slider-item/index.php' ?>
      <img src="/src/shared/assets/banners/remont_2880.webp" alt="" />
    </slider-item>

    <slider-item class="slide-item">
      <?php include 'src/components/slider-item/index.php' ?>
      <img src="/src/shared/assets/banners/local_storage_by_2880.webp" alt="" />
    </slider-item>

    <slider-item class="slide-item">
      <?php include 'src/components/slider-item/index.php' ?>
      <img src="/src/shared/assets/banners/minsk-dost_2880.webp" alt="" />
    </slider-item>

    <slider-item class="slide-item">
      <?php include 'src/components/slider-item/index.php' ?>
      <img src="/src/shared/assets/banners/2880dacha1104.webp" alt="" />
    </slider-item>

  </base-slider>
</template>