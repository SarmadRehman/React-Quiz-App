### Understanding `useReducer` in Quiz App

#### `useReducer` Function:

The `useReducer` hook is used for managing complex state logic in React components. It provides an alternative to the `useState` hook and is particularly useful when the state logic involves multiple sub-values or when the next state depends on the previous one.

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state`: Represents the current state of your component.
- `dispatch`: A function used to dispatch actions to update the state.

#### Reducer Function:

The reducer function specifies how the state should change in response to dispatched actions. It takes two parameters: the current state and an action, and returns the new state.

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

#### State Attributes:

In your application, you have various state attributes that play specific roles in managing the state:

- `questions`: Stores an array of questions retrieved from the server.
- `status`: Represents the current status of the application.
- `index`: Keeps track of the current question being displayed.
- `answer`: Stores the user's answer to the current question.
- `points`: Tracks the total points earned by the user.
- `highscore`: Keeps track of the highest score achieved by the user.

#### Order of Operations:

1. **Action Dispatched**: Dispatch an action using `dispatch({ type: 'ACTION_TYPE', payload: value })`.
2. **Reducer Function Called**: The reducer function is called with the current state and the dispatched action.
3. **Action Type Evaluated**: Evaluate the action type and perform necessary state updates based on it.
4. **New State Returned**: Return a new state object reflecting the updates.
5. **Component Re-renders**: React re-renders the component with the updated state, updating relevant UI parts.

#### Summary:

- `useReducer` is used for managing complex state logic.
- The reducer function specifies how the state should change.
- State attributes play specific roles in managing the state.
- Actions trigger state updates through the reducer function.
- React re-renders components with updated state.

I hope this Markdown explanation helps clarify the usage of `useReducer` and state management in React! Let me know if you need further assistance.
