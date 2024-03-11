import { useReducer, useEffect } from "react";
export function useQuiz() {
  const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
    //👇THINKING OF THE STATES IN ADVANCE FOR FURTHER SIMULATION
    //'loading', 'error','ready' ,'active','finished'
  };
  const secs_per_question = 60;
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return { ...state, status: "error" };
      case "start":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * secs_per_question,
        };
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          // setting the answer back to default i.e null
          answer: null,
        };
      case "Finished":
        return {
          ...state,
          status: "Finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case "Retry":
        return {
          ...state,
          status: "loading", // Update status to loading
          index: 0,
          answer: null,
          points: 0,
          highscore: 0,
        };
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "Finished" : state.status,
        };

      default:
        throw new Error("Active Unknown");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  // for changing status dispatcher is called
  useEffect(
    function () {
      if (status === "loading") {
        fetch("http://localhost:8000/questions")
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          .catch((err) => dispatch({ type: "dataFailed" }));
      }
    },
    [status]
  ); // Trigger effect when status changes
  return {
    state,
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    dispatch,
  };
}
