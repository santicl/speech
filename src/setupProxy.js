module.exports = function setupProxy(app) {
  const meetingApi = import('../server/meeting-api.mjs').then(module => module.default)

  app.get('/api/meeting', async (request, response, next) => {
    try {
      const handle = await meetingApi
      const url = new URL(request.originalUrl, 'http://localhost')
      const result = await handle(new Request(url))
      response.status(result.status)
      result.headers.forEach((value, header) => response.set(header, value))
      response.send(Buffer.from(await result.arrayBuffer()))
    } catch (error) {
      next(error)
    }
  })
}
