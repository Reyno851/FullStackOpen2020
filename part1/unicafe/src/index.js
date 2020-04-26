import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = (props) => {
  // If statistic is positive percentage, return text with a % sign
  if (props.text === "positive") {
    return (
      <tr>
        <td> {props.text} </td>
        <td> {props.value} % </td>
      </tr>
    );
  } else {
    // else simply return the value
    return (
      <tr>
        <td> {props.text} </td>
        <td> {props.value} </td>
      </tr>
    );
  }
};

const Statistics = (props) => {
  if (props.all === 0) {
    return <div> No feedback given </div>;
  } else {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />
          <Statistic text="neutral" value={props.neutral} />
          <Statistic text="bad" value={props.bad} />
          <Statistic text="all" value={props.all} />
          <Statistic text="average" value={props.average} />
          <Statistic text="positive" value={props.positivePCT} />
        </tbody>
      </table>
    );
  }
};

const Anecdotes = (props) => {
  return (
    <div>
      <h1> Anecdote of the day </h1>
      <div>
        {props.selectedAnecdote}
        <br />
        has {props.selectedAnecdotePoints} votes
        <br />
        <Button buttonFunction={props.addPoint} text="vote" />
        <Button buttonFunction={props.generateAnecdote} text="next anecdote" />
      </div>
      <h1> Anecdote with most votes </h1>
      {props.topAnecdote}
      <br />
      has {props.topAnecdotePoints} votes
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.buttonFunction}> {props.text} </button>;
};

const App = (props) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(); // Set state of average as blank instead of 0, as original average is not 0 but undefined
  const [positivePCT, setPositivePCT] = useState(0);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.apply(null, new Array(props.anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );
  const [topVote, setTopVote] = useState(0);

  var addGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    // In setAverage, use good+1 instead of good as without the +1,
    // React refers to the previous state of good, which is not what we want
    setAverage(((good + 1) * 1 + neutral * 0 + bad * -1) / (all + 1));
    setPositivePCT(((good + 1) / (all + 1)) * 100);
  };

  var addNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    // In setAverage, use neutral+1 instead of neutral as without the +1,
    // React refers to the previous state of neutral, which is not what we want
    setAverage((good * 1 + (neutral + 1) * 0 + bad * -1) / (all + 1));
    setPositivePCT((good / (all + 1)) * 100);
  };

  var addBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    // In setAverage, use bad+1 instead of bad as without the +1,
    // React refers to the previous state of bad, which is not what we want
    setAverage((good * 1 + neutral * 0 + (bad + 1) * -1) / (all + 1));
    setPositivePCT((good / (all + 1)) * 100);
  };

  var generateAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  var addPoint = () => {
    const copy = [...points]; // Make a copy of points array in state
    copy[selected] += 1; // Add one to current selected quote
    setPoints(copy); // Set the new points array state
    setTopVote(indexOfMax(copy)); // Set top vote to index of highest value in points(copy) array
  };

  // Write own function to obtain index of maximum value in array
  // Credits: https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
  var indexOfMax = (arr) => {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  };

  return (
    <div>
      <h1> give feedback </h1>
      <Button buttonFunction={addGood} text="good" />
      <Button buttonFunction={addNeutral} text="neutral" />
      <Button buttonFunction={addBad} text="bad" />
      <h1> statistics </h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positivePCT={positivePCT}
      />
      <Anecdotes
        selectedAnecdote={props.anecdotes[selected]}
        selectedAnecdotePoints={points[selected]}
        topAnecdote={props.anecdotes[topVote]}
        topAnecdotePoints={points[topVote]}
        addPoint={addPoint}
        generateAnecdote={generateAnecdote}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
