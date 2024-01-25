import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Filter from "./Filter";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    } else {
      const matching = state.filter.toLowerCase();
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(matching)
      );
    }
  });

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`you voted an anecdote`, 3));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
