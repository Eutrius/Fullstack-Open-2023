import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }

  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"all"} value={all} />
      <StatisticLine text={"average"} value={average} />
      <StatisticLine text={"positive"} value={`${positive} %`} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (state, setState) => {
    setState(state + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick(good, setGood)} text={"good"} />
      <Button
        handleClick={() => handleClick(neutral, setNeutral)}
        text={"neutral"}
      />
      <Button handleClick={() => handleClick(bad, setBad)} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
