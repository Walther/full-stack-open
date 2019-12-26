import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => <h1>{props.course}</h1>
const Total = props => <p>Number of exercises {props.total}</p>
const Part = props => (
  <p>
    {props.title} {props.exercises}
  </p>
)

const Content = props => {
  return (
    <div>
      {/* oh no */}
      <Part title={props.part1.title} exercises={props.part1.exercises} />
      <Part title={props.part2.title} exercises={props.part2.exercises} />
      <Part title={props.part3.title} exercises={props.part3.exercises} />
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      {/* oh no */}
      <Content
        part1={{ title: part1, exercises: exercises1 }}
        part2={{ title: part2, exercises: exercises2 }}
        part3={{ title: part3, exercises: exercises3 }}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
