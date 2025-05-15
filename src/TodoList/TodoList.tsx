import React, { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../@types/todo.type'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [curTodo, setCurTodo] = useState<Todo | null>(null)
  const doneTodo = todos.filter((todo) => todo.done)
  const notDoneTodo = todos.filter((todo) => !todo.done)
  useEffect(() => {
    const todoList = localStorage.getItem('todoList')
    const todoObj = JSON.parse(todoList || '[]')
    setTodos(todoObj)
  }, [])
  const addtodo = (title: string) => {
    const todo: Todo = {
      id: Date.now().toString(),
      title,
      done: false
    }
    setTodos((prev) => [...prev, todo])
    const todoList = localStorage.getItem('todoList')
    const todoObj = JSON.parse(todoList || '[]')
    const newTodoObj = [...todoObj, todo]
    localStorage.setItem('todoList', JSON.stringify(newTodoObj))
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done } : todo))
    )
  }
  const handleEditTodo = (id: string, title: string) => {
    setCurTodo((prev) => {
      if (prev) {
        return { ...prev, title }
      }
      return null
    })
  }
  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    setCurTodo(findedTodo ? findedTodo : null)
  }

  const finishedEditTodo = () => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === curTodo?.id ? { ...todo, title: curTodo.title } : todo
      )
    )

    const todoList = localStorage.getItem('todoList')
    const todoObj = JSON.parse(todoList || '[]')
    const newTodoObj = todoObj.map((todo: Todo) =>
      todo.id === (curTodo as Todo).id
        ? { ...todo, title: (curTodo as Todo).title }
        : todo
    )
    localStorage.setItem('todoList', JSON.stringify(newTodoObj))
    setCurTodo(null)
  }

  const delTodo = (id: string) => {
    if (curTodo?.id === id) setCurTodo(null)
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addTodo={addtodo}
          curTodo={curTodo}
          editTodo={handleEditTodo}
          finishedEditTodo={finishedEditTodo}
        />
        <TaskList
          todos={notDoneTodo}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          delTodo={delTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodo}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          delTodo={delTodo}
        />
      </div>
    </div>
  )
}
