import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';



const Mycomp = ({ count, context }) => {

  const item = <div className='list-item'>{context}</div>
  const [list, setList] = useState([{
    title: 'Read Books',
    description: 'I have to read amazing spider man novels',
    created: '07/09/2024',
    dueDate: '10/09/2024',
    remindOn: '09/09/2024'
  },
  {
    title: 'Jym scedule',
    description: 'I have to maintain my health also',
    created: '07/09/2024',
    dueDate: '10/09/2024',
    remindOn: '09/09/2024'
  },
  {
    title: 'MMA classes',
    description: 'I have to focus what i love most',
    created: '07/09/2024',
    dueDate: '10/09/2024',
    remindOn: '09/09/2024'

  }])


  // useEffect(()=>{
  //     setList(item)
  // },[])



  return (
    <>
      <button  >Click</button>
      {list}</>
  )
}

function App({ children }) {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Adeel
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React bb {children}
        </a>
      </header>
    </div>
  );
}

export { App, Mycomp };
