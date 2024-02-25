import Header from "./Header";
import "./index.css";
import Main from "./Main";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",

  //👇THINKING OF THE STATES IN ADVANCE FOR FURTHER SIMULATION
  //'loading', 'error','ready' ,'active','finished'
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "Error" };
    default:
      throw new Error("Unknown action");
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  });
  return (
    <div className="app">
      <Header />
      <Main className="main">
        <p>1/15</p>
        <p>Questions</p>
      </Main>
    </div>
  );
}

export default App;
