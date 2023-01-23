import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (state, setState) => {
    setState(state + 1);
  };

  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick(good, setGood)} text={"good"} />
      <Button
        handleClick={() => handleClick(neutral, setNeutral)}
        text={"neutral"}
      />
      <Button handleClick={() => handleClick(bad, setBad)} text={"bad"} />
      <h1>statistics</h1>
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {all} </p>
      <p>average {average}</p>
      <p>positive {positive} % </p>
    </div>
  );
};

export default App;
