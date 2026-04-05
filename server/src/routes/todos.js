import * as controller from '../controllers/todoController.js'

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
    { schema: { response: { 200: { type: 'array', items: todoSchema } } } },
    controller.listTodos,
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
            priority: { type: 'string', enum: ['low', 'medium', 'high'], default: 'medium' },
          },
        },
        response: { 201: todoSchema },
      },
    },
    controller.createTodo,
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
    controller.updateTodo,
  )

  fastify.delete(
    '/:id',
    {
      schema: {
        params: { type: 'object', properties: { id: { type: 'integer' } } },
        response: { 204: { type: 'null' } },
      },
    },
    controller.deleteTodo,
  )
}