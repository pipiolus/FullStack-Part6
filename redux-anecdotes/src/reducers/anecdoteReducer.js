import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdotesSlicer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      return state.map((anecdote) =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, setAnecdotes, appendAnecdote } =
  anecdotesSlicer.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAllAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(
      content
    );
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const addNewVote = (state, id) => {
  return async (dispatch) => {
    const anecdoteToChange = state.find(
      (anecdote) => anecdote.id === id
    );

    const updatedAnecdote = await anecdoteService.updateAnecdote(id, {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    });
    dispatch(vote(updatedAnecdote.id));
  };
};

export default anecdotesSlicer.reducer;
