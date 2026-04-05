import * as gateway from '../gateways/todoGateway.js'

export async function listItems() {
  return gateway.getAllTodos()
}

export async function createItem({ title, description = null, priority = 'medium' }) {
  return gateway.createTodo({ title, description, priority })
}

export async function updateItem(id, fields) {
  return gateway.updateTodo(id, fields)
}

export async function deleteItem(id) {
  return gateway.deleteTodo(id)
}