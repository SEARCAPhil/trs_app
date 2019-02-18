const URL = {
  scheme: 'http',
  host: 'localhost',
  path: 'trs_app/www'
}

URL.fullPath = `${URL.scheme}://${URL.host}/${URL.path}/`

export { URL }
