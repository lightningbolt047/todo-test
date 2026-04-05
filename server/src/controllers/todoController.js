import * as usecases from '../usecases/todoUsecase.js'

export async function listTodos(_request, _reply) {
  return usecases.listItems()
}

export async function createTodo(request, reply) {
  const todo = await usecases.createItem(request.body)
  return reply.status(201).send(todo)
}

export async function updateTodo(request, reply) {
  const { id } = request.params
  const result = await usecases.updateItem(id, request.body)

  if (result.noFields) return reply.status(400).send({ error: 'No fields to update' })
  if (!result.todo) return reply.status(404).send({ error: 'Not found' })
  return result.todo
}

export async function deleteTodo(request, reply) {
  const deleted = await usecases.deleteItem(request.params.id)
  if (!deleted) return reply.status(404).send({ error: 'Not found' })
  return reply.status(204).send()
}