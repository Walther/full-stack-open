import React, { useState } from "react";

const Statistics = ({ statistics }) => {
  let { good, neutral, bad } = statistics;
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No data yet</p>
      </>
    );
  }
  let total = good + neutral + bad;
  let average = ((good - bad) / total).toFixed(2);
  let positive = ((good / total) * 100).toFixed(2).concat("%");
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticsLine name="Good" value={good} />
          <StatisticsLine name="Neutral" value={neutral} />
          <StatisticsLine name="Bad" value={bad} />
          <StatisticsLine name="Total" value={total} />
          <StatisticsLine name="Average" value={average} />
          <StatisticsLine name="Positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

const StatisticsLine = ({ name, value }) => (
  <tr>
    <td style={{ paddingRight: "2rem" }}>{name}</td>
    <td style={{ textAlign: "right" }}>{value}</td>
  </tr>
);

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const submitGood = () => {
    setGood(good + 1);
  };

  const submitBad = () => {
    setBad(bad + 1);
  };

  const submitNeutral = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <h2>Feedback form</h2>
      <Button text="Good" handleClick={() => submitGood()} />
      <Button text="Neutral" handleClick={() => submitNeutral()} />
      <Button text="Bad" handleClick={() => submitBad()} />
      <Statistics statistics={{ good, neutral, bad }} />
    </div>
  );
};

export default App;
