import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const AnecdoteDisplay = (props) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes} <br />
      has {props.vote} vote <br />
    </div>
  );
};

const MostVoteAnecdote = (props) => {
  var max = props.vote[0];
  var maxIndex = 0;
  for (var i = 0; i < props.anecdotes.length; i++) {
    if (props.vote[i] > max) {
      maxIndex = i;
      max = props.vote[i];
    }
  }
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      {props.anecdotes[maxIndex]} <br />
      has {props.vote[maxIndex]} vote <br />
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  if (selected >= anecdotes.length) {
    setSelected(0);
  }

  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
    console.log("copy array is " + copy);
  };

  return (
    <div>
      <AnecdoteDisplay anecdotes={anecdotes[selected]} vote={vote[selected]} />
      <Button handleClick={handleVote} text="vote" />
      <Button
        handleClick={() => setSelected(selected + 1)}
        text="next anecdote"
      />
      <MostVoteAnecdote anecdotes={anecdotes} vote={vote} />
    </div>
  );
};

export default App;
