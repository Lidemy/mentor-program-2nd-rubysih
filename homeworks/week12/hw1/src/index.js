import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TodoList />, document.getElementById('container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
