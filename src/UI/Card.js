import React from 'react'
import classes from './Card.module.css'

export default function (props) {
  return <div className={classes.card}>{props.children}</div>
}
