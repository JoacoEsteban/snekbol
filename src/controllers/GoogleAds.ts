import config from '../config/core.config'

(() => {
  // if (!(config.ENV_PROD && config.GOOGLE_ADS_CLIENT)) return console.log('Not setting ads', config.ENV_PROD, config.GOOGLE_ADS_CLIENT)
  // $('html head').append(`<script data-ad-client="${config.GOOGLE_ADS_CLIENT}" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>`)
})()