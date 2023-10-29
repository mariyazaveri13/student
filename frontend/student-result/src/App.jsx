import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import StudentData from './components/StudentData';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StudentData />}></Route>
        <Route path="/addstudent" element={<AddStudent />} />
      </Routes>
    </>
  );
}

export default App;
