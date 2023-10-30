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

  function formatDate(date) {
    let d = new Date(date);
    return `${d.getDate()} ${d.toLocaleString('default', {
      month: 'short',
    })} ${d.getFullYear()}`;
  }

  return (
    <>
      <h1>This is student data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthdate</th>
            <th>email</th>
            <th>enrollmentnum</th>
            <th>gender</th>
            <th>hobbies</th>
            <th>semester</th>
            <th>paper1</th>
            <th>paper2</th>
            <th>paper3</th>
            <th>result</th>
            <th>comments</th>
            <th>createdat</th>
          </tr>
        </thead>
        <tbody>
          {state.students.map((stud) => {
            return (
              <tr key={stud._id}>
                <td>
                  <input type="text" name="name" id="name" value={stud.name} />
                </td>
                <td>
                  <input
                    type="date"
                    name="birthdate"
                    id="birthdate"
                    value={stud.birthdate}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={stud.email}
                  />
                </td>
                <td>{stud.enrollmentnum}</td>
                <td>
                  <input
                    type="radio"
                    value="Male"
                    name="gender"
                    checked={stud.gender === 'Male'}
                    onChange={(e) => {}}
                  ></input>
                  <label>Male</label>
                  <input
                    onChange={(e) => {}}
                    type="radio"
                    value="Female"
                    name="gender"
                    checked={stud.gender === 'Female'}
                  ></input>
                  <label>Female</label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    value=""
                    checked={stud.hobbies.includes('Reading')}
                  ></input>
                  <label>Reading</label>
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    value=""
                    checked={stud.hobbies.includes('Sports')}
                  ></input>
                  <label>Sports</label>
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    value=""
                    checked={stud.hobbies.includes('Writing')}
                  ></input>
                  <label>Writing</label>
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    value=""
                    checked={stud.hobbies.includes('Singing')}
                  ></input>
                  <label>Singing</label>
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    value=""
                    checked={stud.hobbies.includes('Dancing')}
                  ></input>
                  <label>Dancing</label>
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    value=""
                    checked={stud.hobbies.includes('Travelling')}
                  ></input>
                  <label>Travelling</label>
                </td>
                <td>
                  <select
                    name="semester"
                    value={stud.semester}
                    onChange={() => {}}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </td>
                <td>
                  <input
                    style={{ width: '40px' }}
                    type="number"
                    name="paper1"
                    id="paper1"
                    value={stud.paper1}
                  />
                </td>
                <td>
                  <input
                    style={{ width: '40px' }}
                    type="number"
                    name="paper2"
                    id="paper2"
                    value={stud.paper2}
                  />
                </td>
                <td>
                  <input
                    style={{ width: '40px' }}
                    type="number"
                    name="paper3"
                    id="paper3"
                    max={100}
                    value={stud.paper3}
                  />
                </td>
                <td>{stud.result}</td>
                <td>
                  <textarea value={stud.comments} name="comments"></textarea>
                </td>
                <td>{formatDate(stud.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <br></br>
      <button type="button">
        <Link to="/addstudent">Add Student</Link>
      </button>
    </>
  );
}
