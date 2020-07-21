const ENV_PROD = process.env.NODE_ENV === 'production'

const config = {
  ENV_PROD,
  BASE_URL: ENV_PROD ? (process.env.API_BASE_URL || 'snekbol-backend.herokuapp.com') : 'localhost:5000',
  USE_SSL: ENV_PROD,
  GOOGLE_ADS_CLIENT: process.env.GOOGLE_ADS_CLIENT
}

export default config