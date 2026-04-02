import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { migrate } from './db/migrate.js'
import todoRoutes from './routes/todos.js'

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'HH:MM:ss' },
    },
  },
})

await fastify.register(cors, {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
})

fastify.register(todoRoutes, { prefix: '/api/todos' })

fastify.get('/health', async () => ({
  status: 'ok',
  ts: new Date().toISOString(),
}))

try {
  await migrate()
  await fastify.listen({
    port: Number(process.env.PORT) || 3001,
    host: '0.0.0.0',
  })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
