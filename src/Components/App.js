import Header from "./Header";
import "../index.css";
import Main from "./Main";

import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "./useQuiz";
// const initialState = {
//   questions: [],
//   status: "loading",
//   index: 0,
//   answer: null,
//   points: 0,
//   highscore: 0,
//   secondsRemaining: null,
//   //👇THINKING OF THE STATES IN ADVANCE FOR FURTHER SIMULATION
//   //'loading', 'error','ready' ,'active','finished'
// };
// const secs_per_question = 60;

// function reducer(state, action) {
//   switch (action.type) {
//     case "dataReceived":
//       return {
//         ...state,
//         questions: action.payload,
//         status: "ready",
//       };
//     case "dataFailed":
//       return { ...state, status: "error" };
//     case "start":
//       return {
//         ...state,
//         status: "active",
//         secondsRemaining: state.questions.length * secs_per_question,
//       };
//     case "newAnswer":
//       const question = state.questions.at(state.index);
//       return {
//         ...state,
//         answer: action.payload,
//         points:
//           action.payload === question.correctOption
//             ? state.points + question.points
//             : state.points,
//       };
//     case "nextQuestion":
//       return {
//         ...state,
//         index: state.index + 1,
//         // setting the answer back to default i.e null
//         answer: null,
//       };
//     case "Finished":
//       return {
//         ...state,
//         status: "Finished",
//         highscore:
//           state.points > state.highscore ? state.points : state.highscore,
//       };
//     case "Retry":
//       return {
//         ...state,
//         status: "loading", // Update status to loading
//         index: 0,
//         answer: null,
//         points: 0,
//         highscore: 0,
//       };
//     case "tick":
//       return {
//         ...state,
//         secondsRemaining: state.secondsRemaining - 1,
//         status: state.secondsRemaining === 0 ? "Finished" : state.status,
//       };

//     default:
//       throw new Error("Active Unknown");
//   }
// }
function App() {
  //wanting a function conventionally 'reducer' and an initial state i.e an object
  // const [state, dispatch] = useReducer(reducer, initialState);
  // destructuring proprtties of the object
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    dispatch,
  } = useQuiz();
  // specifcs on needs
  //Number of questions in the array of questions from API
  const numQuestions = questions.length;
  //over the loaded array
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // for changing status dispatcher is called
  // useEffect(
  //   function () {
  //     if (status === "loading") {
  //       fetch("http://localhost:8000/questions")
  //         .then((res) => res.json())
  //         .then((data) => dispatch({ type: "dataReceived", payload: data }))
  //         .catch((err) => dispatch({ type: "dataFailed" }));
  //     }
  //   },
  //   [status]
  // ); // Trigger effect when status changes

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "Finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
