import { useState } from "react";

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text} </td>
        <td>{props.value} %</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value} %</td>
    </tr>
  );
};

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral;
  const average = (props.good * 1 + props.neutral * 0 - props.bad) / total;
  const positive = (props.good / total) * 100;
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        no feedback given
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="total" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;