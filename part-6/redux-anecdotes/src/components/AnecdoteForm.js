import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = (props) => {
  const anecdotes = props.anecdotes;

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createAnecdote(content);
    props.setNotification(`Added new anecdote: "${content}"`, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => addAnecdote(e)}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  };
};

const mapDispatchToProps = { createAnecdote, setNotification };

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);
export default ConnectedAnecdoteForm;
