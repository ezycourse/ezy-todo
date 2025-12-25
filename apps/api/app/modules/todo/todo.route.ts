import router from '@adonisjs/core/services/router'

import TodosController from './todo.controller.js'

router.post('/todo', [TodosController, 'create'])

router.get('/todo', [TodosController, 'index'])

router.patch('/todo/:id', [TodosController, 'update'])
router.get('/todo/:id', [TodosController, 'getOne'])
router.delete('/todo/:id', [TodosController, 'delete'])
