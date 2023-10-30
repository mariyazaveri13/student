import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddStudent() {
  const [state, setState] = useState({
    name: '',
    birthdate: undefined,
    email: '',
    enrollmentnum: undefined,
    gender: undefined,
    hobbies: [],
    semester: undefined,
    paper1: undefined,
    paper2: undefined,
    paper3: undefined,
  });

  return (
    <>
      <h1>
        <u>Add Student and Marks</u>
      </h1>
      <br></br>
      <button type="button">
        <Link to="/">Home</Link>
      </button>
      <br></br>
      <br></br>
      <form>
        <label for="name">
          <b>Name</b>
        </label>
        <br></br>
        <input type="text" name="name" id="name"></input>
        <hr></hr>

        <label for="birthdate">
          <b>Birthdate</b>
        </label>
        <br></br>
        <input type="date" name="birthdate" id="birthdate"></input>
        <hr></hr>

        <label for="email">
          <b>Email</b>
        </label>
        <br></br>
        <input type="email" name="email" id="email" />
        <hr></hr>

        <label for="enrollmentnum">
          <b>Enrollment Number</b>
        </label>
        <br></br>
        <input type="number" name="enrollmentnum" id="enrollmentnum" />
        <hr></hr>

        <label for="gender">
          <b>Gender</b>
        </label>
        <br></br>
        <input
          type="radio"
          value="Male"
          name="gender"
          checked={false}
          onChange={(e) => {}}
        ></input>
        <label>Male</label>
        <input
          onChange={(e) => {}}
          type="radio"
          value="Female"
          name="gender"
          checked={true}
        ></input>
        <label>Female</label>
        <hr></hr>

        <label for="gender">
          <b>Gender</b>
        </label>
        <br></br>
        <input
          type="checkbox"
          onChange={() => {}}
          value=""
          // checked={stud.hobbies.includes('Reading')}
        ></input>
        <label>Reading</label>
        <input
          type="checkbox"
          onChange={() => {}}
          value=""
          // checked={stud.hobbies.includes('Sports')}
        ></input>
        <label>Sports</label>
        <input
          type="checkbox"
          onChange={() => {}}
          value=""
          // checked={stud.hobbies.includes('Writing')}
        ></input>
        <label>Writing</label>
        <input
          type="checkbox"
          onChange={() => {}}
          value=""
          // checked={stud.hobbies.includes('Singing')}
        ></input>
        <label>Singing</label>
        <input
          type="checkbox"
          onChange={() => {}}
          value=""
          // checked={stud.hobbies.includes('Dancing')}
        ></input>
        <label>Dancing</label>
        <input
          type="checkbox"
          onChange={() => {}}
          value=""
          // checked={stud.hobbies.includes('Travelling')}
        ></input>
        <label>Travelling</label>
        <hr></hr>

        <label for="semester">
          <b>Semester</b>
        </label>
        <br></br>
        <select name="semester" onChange={() => {}}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <hr></hr>

        <label for="paper1">
          <b>Paper 1</b>
        </label>
        <br></br>
        <input type="number" name="paper1" id="paper1" />
        <hr></hr>

        <label for="paper2">
          <b>Paper 2</b>
        </label>
        <br></br>
        <input type="number" name="paper2" id="paper2" />
        <hr></hr>

        <label for="paper3">
          <b>Paper 3</b>
        </label>
        <br></br>
        <input type="number" name="paper3" id="paper3" />
        <hr></hr>
      </form>
    </>
  );
}
