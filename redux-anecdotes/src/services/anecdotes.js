import axios from "axios";

const baseUrl = "http://localhost:3003/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateVote = async (id) => {
  const currentAnecdote = await axios.get(`${baseUrl}/${id}`);
  const currentVotes = currentAnecdote.data.votes;
  const updatedVotes = currentVotes + 1;
  const response = await axios.put(`${baseUrl}/${id}`, {
    content: currentAnecdote.data.content,
    votes: updatedVotes,
  });
  return response.data;
};

export default { getAll, createNew, updateVote };
