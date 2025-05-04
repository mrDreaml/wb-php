<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/src/shared/assets/favicon.ico" type="image/vnd.microsoft.icon">
  <link rel="stylesheet" href="main-page.css" />
  <title>wildberries</title>
</head>
<body>
  <support-chat></support-chat>
  <main-header><?php include 'src/components/main-header/index.php' ?></main-header>
  <main-menu hidden><?php include 'src/components/main-menu/index.php' ?></main-menu>
  <shadow-area><?php include 'src/components/shadow-area/index.php' ?></shadow-area>
  <main class="main-content">
    <promo-banner><?php include 'src/components/promo-baner/index.php' ?></promo-banner>
    <main-product-list><?php include 'src/components/main-product-list/index.php' ?></main-product-list>
  </main>

  <script type="module" src="index.js"></script>
</body>

</html>