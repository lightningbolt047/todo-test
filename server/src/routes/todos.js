import { namedQuery } from '../db/index.js'

const todoSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    description: { type: ['string', 'null'] },
    priority: { type: 'string', enum: ['low', 'medium', 'high'] },
    completed: { type: 'boolean' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
  },
}

export default async function todoRoutes(fastify) {
  fastify.get(
    '/',
    {
      schema: { response: { 200: { type: 'array', items: todoSchema } } },
    },
    async () => {
      const { rows } = await namedQuery(
        'SELECT * FROM todos ORDER BY created_at DESC',
        {},
      )
      return rows
    },
  )

fastify.post(
    '/',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string', minLength: 1 },
            description: { type: 'string' },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              default: 'medium',
            },
          },
        },
        response: { 201: todoSchema },
      },
    },
    async (request, reply) => {
      const { title, description = null, priority = 'medium' } = request.body
      const { rows } = await namedQuery(
        'INSERT INTO todos (title, description, priority) VALUES (:title, :description, :priority) RETURNING *',
        { title, description, priority },
      )
      return reply.status(201).send(rows[0])
    },
  )

  fastify.patch(
    '/:id',
    {
      schema: {
        params: { type: 'object', properties: { id: { type: 'integer' } } },
        body: {
          type: 'object',
          properties: {
            title: { type: 'string', minLength: 1 },
            description: { type: 'string' },
            priority: { type: 'string', enum: ['low', 'medium', 'high'] },
            completed: { type: 'boolean' },
          },
        },
        response: { 200: todoSchema },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const allowed = ['title', 'description', 'priority', 'completed']
      const params = { id }
      const setClauses = []

      for (const key of allowed) {
        if (key in request.body) {
          params[key] = request.body[key]
          setClauses.push(`${key} = :${key}`)
        }
      }

      if (setClauses.length === 0)
        return reply.status(400).send({ error: 'No fields to update' })

      const { rows } = await namedQuery(
        `UPDATE todos SET ${setClauses.join(', ')}, updated_at = NOW() WHERE id = :id RETURNING *`,
        params,
      )
      if (!rows[0]) return reply.status(404).send({ error: 'Not found' })
      return rows[0]
    },
  )

  fastify.delete(
    '/:id',
    {
      schema: {
        params: { type: 'object', properties: { id: { type: 'integer' } } },
        response: { 204: { type: 'null' } },
      },
    },
    async (request, reply) => {
      const { rowCount } = await namedQuery(
        'DELETE FROM todos WHERE id = :id',
        { id: request.params.id },
      )
      if (rowCount === 0) return reply.status(404).send({ error: 'Not found' })
      return reply.status(204).send()
    },
  )
}
