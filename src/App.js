import Header from "./Header";
import "./index.css";
import Main from "./Main";
import { useEffect } from "react";
function App() {
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => console.log(data));
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
