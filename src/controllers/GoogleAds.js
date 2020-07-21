import config from '../config/core.config'

(() => {
  if (!(config.ENV_PROD && config.AD_CLIENT)) return
  $('html head').append(`<script data-ad-client="${config.GOOGLE_ADS_CLIENT}" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>`)
})()