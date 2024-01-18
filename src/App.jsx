import React from 'react'
import Mainpage from './components/Mainpage'
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div >
      {/* <Mainpage/> */}
      <Routes>
      <Route path="/" element={<Mainpage/>}/>
      <Route path="/Register" element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App