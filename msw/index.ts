import process from 'node:process'
import { HttpResponse, http } from 'msw'
import { createServer } from '@mswjs/http-middleware'
import { openapi, passwordLogin, swagger } from '../lib/handler'

const handler = [
  http.get('/', async ({ request }) => {
    const url = new URL(request.url)
    url.pathname = '/docs'
    return HttpResponse.redirect(url.toString(), 302)
  }),
  http.get('/openapi.json', async ({ request }) => {
    return await openapi(request)
  }),
  http.get('/docs', async ({ request }) => {
    return await swagger(request)
  }),
  http.post('/password', async ({ request }) => {
    return await passwordLogin(request)
  }),
]

const server = createServer(...handler)
const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${port}`)
})

export default handler
