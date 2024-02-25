import Header from "./Header";
import "./index.css";
import Main from "./Main";
function App() {
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
