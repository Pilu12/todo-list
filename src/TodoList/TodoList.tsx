import React, { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../@types/todo.type'

interface HandleTodos {
  (todos: Todo[]): Todo[]
}

const syncReactToLocal = (handNewTodos: HandleTodos) => {
  const todoList = localStorage.getItem('todoList')
  const todoObj = JSON.parse(todoList || '[]')
  const newTodoObj = handNewTodos(todoObj)
  localStorage.setItem('todoList', JSON.stringify(newTodoObj))
}

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
    syncReactToLocal((todosObj: Todo[]) => [...todosObj, todo])
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
    const handle = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === curTodo?.id) {
          return { ...todo, title: curTodo.title }
        }
        return todo
      })
    }
    setTodos(handle)
    setCurTodo(null)
    syncReactToLocal(handle)
  }

  const delTodo = (id: string) => {
    if (curTodo?.id === id) setCurTodo(null)
    const handle = (todosObj: Todo[]) => {
      return todosObj.filter((todo) => todo.id !== id)
    }
    setTodos(handle)
    syncReactToLocal(handle)
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
