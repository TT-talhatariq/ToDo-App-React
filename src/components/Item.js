import React from 'react'
import classes from './Item.module.css'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { MdDone } from 'react-icons/md'
export default function Item(props) {
  console.log(props.tasks)
  return (
    <div>
      <h5>Your Tasks</h5>
      <ul>
        {props.tasks.map((task) => (
          <li key={task.id}>
            {task.status === 'done' ? (
              <del>{task.name}</del>
            ) : (
              <p>{task.name}</p>
            )}

            <div>
              <button
                onClick={() => {
                  props.onComplete(task.id)
                }}
                className={classes.done}
              >
                <MdDone />
              </button>
              <button
                onClick={() => {
                  props.onEdit(task.id)
                }}
                className={classes.edit}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  props.onRemove(task.id)
                }}
                className={classes.delete}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
