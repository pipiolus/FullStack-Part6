import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../../requests";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useContext(NotificationContext)[1];

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => queryClient.invalidateQueries(["anecdotes"]),
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    if (content.length < 5) {
      notificationDispatcher("Anecdote must have length 5 or more");
      return;
    }
    newAnecdoteMutation.mutate({ content, votes: 0 });
    notificationDispatcher(`"${content}" created`);
  };

  const notificationDispatcher = (message) => {
    dispatch({ type: "MSG", payload: message });
    setTimeout(() => {
      dispatch({ type: "MSG", payload: "" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
