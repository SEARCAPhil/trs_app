const URL = {
  scheme: 'http',
  host: 'localhost',
  base: 'trs_app_api/public',
  path: 'trs_app_api/public/api'
}

URL.fullPath = `${URL.scheme}://${URL.host}/${URL.path}/`

export { URL }
