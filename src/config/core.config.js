const ENV_PROD = process.env.NODE_ENV === 'production'
console.log('aber', ENV_PROD, process.env.NODE_ENV)
const config = {
  ENV_PROD,
  BASE_URL: ENV_PROD ? (process.env.API_BASE_URL || 'snekbol-backend.herokuapp.com') : 'localhost:5000',
  USE_SSL: ENV_PROD,
}

export default config