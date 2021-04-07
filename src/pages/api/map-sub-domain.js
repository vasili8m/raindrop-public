import http from 'http'
import https from 'https'

export default function handler(req, res) {
    const isDev = process.env.NODE_ENV!='production'

    const { host } = req.headers
    const name = host.split('.')[0]
    const destination = new URL(`/user/${name}`, `${isDev?'http':'https'}://${host}`)

    const how = isDev ? http : https
    how.get(destination, (r)=>r.pipe(res))
}