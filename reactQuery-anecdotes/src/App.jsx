import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "../requests";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();

  const dispatch = useContext(NotificationContext)[1];

  const updateAnecdoteeMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries(["anecdotes"]),
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 2,
  });

  if (result.isError)
    return (
      <div>
        <h2>
          anecdote service not available due to problems in server
        </h2>
      </div>
    );

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    updateAnecdoteeMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  const notificationDispatcher = (message) => {
    dispatch({ type: "MSG", payload: message });
    setTimeout(() => {
      dispatch({ type: "MSG", payload: "" });
    }, 5000);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                handleVote(anecdote);
                notificationDispatcher(
                  `You voted "${anecdote.content}"`
                );
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
