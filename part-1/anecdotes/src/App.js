import React, { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Anecdote = ({ text, points }) => {
  return (
    <>
      <blockquote>{text}</blockquote>
      <p>{points} points</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const randomAnecdote = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const submitVote = (selected) => {
    let newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  // Ugly hack: storing as a separate array instead of being object-oriented with
  // anecdotes = [ { text: ... points: ...}, ...]
  // although that would probably be cleaner.
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  // Ugly hack 2 due to the separate array thing from above...
  // ...but it gets the job done.
  const best = points.indexOf(
    points.reduce((max, current) => Math.max(max, current), 0)
  );

  return (
    <>
      <h1>Anecdotes</h1>
      <Anecdote text={anecdotes[selected]} points={points[selected]} />
      <Button text="Vote" handleClick={() => submitVote(selected)} />
      <Button text="Random anecdote" handleClick={() => randomAnecdote()} />
      <h2>Most upvoted</h2>
      <Anecdote text={anecdotes[best]} points={points[best]} />
    </>
  );
};

export default App;
