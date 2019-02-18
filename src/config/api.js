const URL = {
  scheme: 'http',
  host: 'localhost',
  base: 'contacts_api/public',
  path: 'contacts_api/public/api'
}

URL.fullPath = `${URL.scheme}://${URL.host}/${URL.path}/`

export { URL }
