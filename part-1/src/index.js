import React from 'react'
import ReactDOM from 'react-dom'
const uuidv4 = require('uuid/v4')

const Header = props => <h1>{props.course}</h1>

const Total = props => {
  const sum = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Number of exercises {sum}</p>
}

const Part = props => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Content = props => (
  <div>
    {props.parts.map(part => (
      <Part name={part.name} exercises={part.exercises} key={uuidv4()} />
    ))}
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
