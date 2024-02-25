function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((op) => (
        <btn className="btn btn-option" key={op}>
          {op}
        </btn>
      ))}
    </div>
  );
}

export default Options;
