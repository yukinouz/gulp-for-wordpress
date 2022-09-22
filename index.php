<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gulp For WordPress | yukinouz1</title>
  <?php wp_head(); ?>
</head>
<body>
  <header class="header">
    <h1 class="header__title">Gulp For WordPress</h1>
  </header>
  <main>
    <section class="wp-sample">
      <div class="inner">
        <h2 class="wp-sample__title">GulpをWordPressで動かすためのサンプルファイル群です。</h2>
        <div class="wp-sample__box">
          <p>このページで確認できること</p>
          <ul class="wp-sample__list">
            <li class="wp-sample__list-item">npm run devでローカルサーバー起動＆ライブリロード</li>
            <li class="wp-sample__list-item">php, css, jsの変更が保存時に反映されること</li>
            <li class="wp-sample__list-item">npm run buildでimgにcacheが付与されること</li>
          </ul>
        </div>
        <div class="wp-sample__img">
          <img src="<?php echo get_template_directory_uri(); ?>/dist/img/img-cat.jpg?ver=3501b26b54d6403e?ver=42202909336dc1f8" alt="cat">
        </div>
        <div class="wp-sample__button">
          <button id="js-alert-button">クリックでjsの動作確認</button>
        </div>
      </div>
    </section>
  </main>
  <?php wp_footer(); ?>
</body>
</html>