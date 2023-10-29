import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function StudentData() {
  const [state, setState] = useState({
    students: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get('http://localhost:5000/students');
      setState((prevState) => ({
        ...prevState,
        students: res.data.students,
      }));
      console.log(res);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
    <>
      <h1>This is student data</h1>
      <table></table>
      <Link to="/addstudent">Add Student</Link>
    </>
  );
}
