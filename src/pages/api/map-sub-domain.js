import http from 'http'

export default function handler(req, res) {
    const { host } = req.headers
    const name = host.split('.')[0]

    const destination = new URL(`/user/${name}`, `https://${host}`)

    http.get(destination, (r)=>r.pipe(res))
}