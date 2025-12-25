import type { HttpContext } from '@adonisjs/core/http'

const todos = []

let idCounter = 0

export default class TodosController {
  public async create(ctx: HttpContext) {
    const { title } = ctx.request.body()

    todos.push({
      id: idCounter++,
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return { message: 'Todo created successfully', todos }
  }

  public async index() {
    return todos
  }

  public async update(ctx: HttpContext) {
    const { id } = ctx.params
    const { title, completed } = ctx.request.body()

    const todo = todos.find((t) => t.id === Number(id))

    if (todo) {
      if (title !== undefined) todo.title = title
      if (completed !== undefined) todo.completed = completed
      todo.updatedAt = new Date().toISOString()
      return { message: 'Todo updated successfully', todo }
    } else {
      return { error: 'Todo not found' }
    }
  }

  public async getOne(ctx: HttpContext) {
    const { id } = ctx.params

    const todo = todos.find((t) => t.id === Number(id))

    if (todo) {
      return todo
    } else {
      return { error: 'Todo not found' }
    }
  }

  public async delete(ctx: HttpContext) {
    const { id } = ctx.params
    const index = todos.findIndex((t) => t.id === Number(id))

    if (index !== -1) {
      const deleted = todos.splice(index, 1)
      return { message: 'Todo deleted successfully', deleted }
    } else {
      return { error: 'Todo not found' }
    }
  }
}
