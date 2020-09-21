<?php
include __DIR__ . '/../../../wp-load.php';
?>
<div id="OnDemand">
    <div class="player_container">
        <h2 class="title"></h2>
        <video id="player" controls playsinline>
        </video>
        <div class="details"></div>
    </div>
    <img class="back" src="<?= plugins_url('images/button_back.png', __FILE__); ?>" alt="Back button">
    <div class="groupDetails"></div>
    <div id="box"></div>
</div>
<script>
    const username = "<?= esc_attr(get_option('StoitIT_username')) ?>";
</script>

<script src="<?= plugins_url('js/jquery.min.js', __FILE__); ?>"></script>
<script src="<?= plugins_url('js/plyr.polyfilled.js', __FILE__); ?>"></script>
<script src="<?= plugins_url('js/hls.min.js', __FILE__); ?>"></script>
<script src="<?= plugins_url('js/script.js', __FILE__); ?>"></script>
<link rel="stylesheet" href="<?= plugins_url('css/plyr.css', __FILE__); ?>"/>
<link rel="stylesheet" href="<?= plugins_url('css/style.css', __FILE__); ?>"/>
