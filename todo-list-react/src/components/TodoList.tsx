import React from 'react'
import TodoItem from './TodoItem'
import { Todo } from '../models/Todos'

const TodoList = ({ filteredTodos, actions }: any) => (
  <ul className="todo-list">
    {filteredTodos.map((todo: Todo) =>
      <TodoItem key={todo.id} todo={todo} {...actions} />
    )}
  </ul>
)

export default TodoList
