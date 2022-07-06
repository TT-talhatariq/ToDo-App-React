import React, { useState, useRef, useEffect } from 'react'
import Card from '../UI/Card'
import Item from './Item'
import classes from './ToDo.module.css'

export default function (props) {
  const itemInputRef = useRef()
  const [list, setList] = useState([])
  const [isEdit, setEdit] = useState(false)
  const [isEditId, setEditId] = useState('')

  //Add Item into the list
  const submitHandler = (e) => {
    e.preventDefault()

    const enteredItem = itemInputRef.current.value

    if (!enteredItem) console.log('error')
    else if (isEdit) {
      const updatedList = list.map((task) => {
        if (task.id === isEditId) task.name = enteredItem

        return task
      })
      console.log(updatedList)
      setList(updatedList)
      setEdit(false)
      setEditId('')
      itemInputRef.current.value = ''
    } else {
      setList([
        ...list,
        {
          id: new Date().getTime().toString(),
          name: enteredItem,
          status: 'pending',
        },
      ])
      itemInputRef.current.value = ''
    }
  }

  //Edit Item in the list
  const editTaskHandler = (id) => {
    itemInputRef.current.value = list.find((task) => task.id === id).name
    setEdit(true)
    setEditId(id)
  }

  //Mark Item completed in the list
  const markDoneHandler = (id) => {
    const updatedList = list.map((task) => {
      if (task.id === id) task.status = 'done'
      return task
    })
    setList(updatedList)
  }
  //Remove an Item in the list
  const removeTaskHandler = (id) => {
    const updatedList = list.filter((task) => task.id !== id)
    setList(updatedList)
  }

  //Add all Item
  const clearAllHandler = () => {
    setList([])
  }

  return (
    <Card>
      <div className={classes.container}>
        <h1>Make your To-Do List</h1>
        <div>
          <p>Add your items here 🖋</p>
          <form onSubmit={submitHandler}>
            <input ref={itemInputRef} type='text' placeholder='Your Item' />
            <button onClick={submitHandler}>submit</button>
          </form>
        </div>

        <div>
          {list.length !== 0 && (
            <Item
              onEdit={editTaskHandler}
              onRemove={removeTaskHandler}
              onComplete={markDoneHandler}
              tasks={list}
            />
          )}
        </div>
        <div>
          {list.length !== 0 && (
            <button onClick={clearAllHandler} className={classes.clearAll}>
              Clear All
            </button>
          )}
        </div>
      </div>
    </Card>
  )
}
