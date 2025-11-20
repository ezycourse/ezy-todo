import type { HttpContext } from '@adonisjs/core/http'

const todos = []

let idCounter = 0

export default class TodosController {
  public async create(ctx: HttpContext) {
    const { title } = ctx.request.body()

    todos.push({ title, createdAt: new Date(), updatedAt: new Date(), id: idCounter++ })

    return 'Todo created'
  }

  public async index() {
    return todos
  }

  public async update(ctx: HttpContext) {
    const { id } = ctx.params
    const { title } = ctx.request.body()

    const todo = todos.find((t) => t.id === Number(id))

    if (todo) {
      todo.title = title
      todo.updatedAt = new Date()
      return 'Todo updated'
    } else {
      return 'Todo not found'
    }
  }

  public async getOne(ctx: HttpContext) {
    const { id } = ctx.params

    const todo = todos.find((t) => t.id === Number(id))

    if (todo) {
      return todo
    } else {
      return 'Todo not found'
    }
  }
}
