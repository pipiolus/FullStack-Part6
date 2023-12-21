import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () =>
  axios.get(baseUrl).then((res) => res.data);

export const createNew = (newAnecdote) =>
  axios
    .post(baseUrl, newAnecdote)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.response.data.error);
    });

export const updateAnecdote = (updatedAnecdote) =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote);
