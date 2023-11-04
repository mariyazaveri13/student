import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AddStudent() {
  const [state, setState] = useState({
    name: '',
    birthdate: '',
    email: '',
    enrollmentnum: '',
    gender: 'Female',
    hobbies: [],
    semester: 1,
    paper1: '',
    paper2: '',
    paper3: '',
    result: '',
  });

  function containsNumbers(str) {
    //return /\d/.test(str);
    return /^[0-9]*$/.test(str);
  }
  function containsSplChar(str) {
    /** /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str) */
    return /[\d`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
  }

  function validateEmail(str) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
  }

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    if (type == 'checkbox') {
      if (checked) {
        setState((preState) => {
          return {
            ...preState,
            hobbies: [...preState.hobbies, value],
          };
        });
      } else {
        setState((preState) => {
          return {
            ...preState,
            hobbies: preState.hobbies.filter((hobby) => hobby !== value),
          };
        });
      }
    } else {
      setState((preState) => {
        return {
          ...preState,
          [name]: type == 'number' ? Number(value) : value,
        };
      });
    }
    console.log(state);
  }

  function handleSubmit(e) {
    e.preventDefault();

    //destructring state
    const {
      name,
      birthdate,
      email,
      enrollmentnum,
      gender,
      hobbies,
      semester,
      paper1,
      paper2,
      paper3,
      result,
    } = state;

    //checking mandatory fields
    if (
      !name ||
      !birthdate ||
      !email ||
      !enrollmentnum ||
      !gender ||
      !hobbies.length > 0 ||
      !semester ||
      !paper1 ||
      !paper2 ||
      !paper3
    ) {
      alert('Please fill all values');
      return;
    }

    //validating numbers
    if (
      !containsNumbers(state.paper1) ||
      !containsNumbers(state.paper2) ||
      !containsNumbers(state.paper3) ||
      !containsNumbers(state.enrollmentnum)
    ) {
      alert('Number fields must contain only numbers');
      return;
    }

    //validating sp char
    if (containsSplChar(state.name)) {
      alert('Name should contain only alphabets');
      return;
    }

    if (!validateEmail(email)) {
      alert('Enter valid email');
      return;
    }

    //preparing obj to send as body of post request
    const obj = {
      name: state.name,
      birthdate: state.birthdate,
      email: state.email,
      enrollmentnum: state.enrollmentnum,
      gender: state.gender,
      hobbies: state.hobbies,
      semester: state.semester,
      paper1: state.paper1,
      paper2: state.paper2,
      paper3: state.paper3,
    };

    obj.result = parseInt(obj.paper1 + obj.paper2 + obj.paper3);

    //checking result
    if (
      obj.result > 300 ||
      obj.paper1 > 100 ||
      obj.paper2 > 100 ||
      obj.paper3 > 100
    ) {
      alert('Issues with your result pls check');
      return;
    }

    sendData(obj);
  }

  async function sendData(obj) {
    try {
      const data = await axios.post('http://localhost:5000/students', obj);
      alert(data.data.message);

      setState((preState) => ({
        ...preState,
        name: '',
        birthdate: '',
        email: '',
        enrollmentnum: '',
        gender: 'Female',
        hobbies: [],
        semester: 1,
        paper1: '',
        paper2: '',
        paper3: '',
        result: '',
      }));
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

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
      <form onSubmit={handleSubmit}>
        <label for="name">
          <b>Name</b>
        </label>
        <br></br>
        <input
          type="text"
          name="name"
          id="name"
          value={state.name}
          onChange={handleChange}
        ></input>
        <hr></hr>

        <label for="birthdate">
          <b>Birthdate</b>
        </label>
        <br></br>
        <input
          type="date"
          value={state.birthdate}
          onChange={handleChange}
          name="birthdate"
          id="birthdate"
        ></input>
        <hr></hr>

        <label for="email">
          <b>Email</b>
        </label>
        <br></br>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={state.email}
        />
        <hr></hr>

        <label for="enrollmentnum">
          <b>Enrollment Number</b>
        </label>
        <br></br>
        <input
          type="number"
          name="enrollmentnum"
          id="enrollmentnum"
          value={state.enrollmentnum}
          onChange={handleChange}
        />
        <hr></hr>

        <label for="gender">
          <b>Gender</b>
        </label>
        <br></br>
        <input
          type="radio"
          value="Male"
          name="gender"
          checked={state.gender === 'Male'}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <label>Male</label>
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type="radio"
          value="Female"
          name="gender"
          checked={state.gender === 'Female'}
        ></input>
        <label>Female</label>
        <hr></hr>

        <label for="hobbies">
          <b>Hobbies</b>
        </label>
        <br></br>
        <input
          type="checkbox"
          onChange={(e) => {
            handleChange(e);
          }}
          value="Reading"
          name="hobbies"
          checked={state.hobbies.includes('Reading')}
        ></input>
        <label>Reading</label>
        <input
          type="checkbox"
          onChange={handleChange}
          value="Sports"
          name="hobbies"
          checked={state.hobbies.includes('Sports')}
        ></input>
        <label>Sports</label>
        <input
          type="checkbox"
          onChange={(e) => {
            handleChange(e);
          }}
          value="Writing"
          name="hobbies"
          checked={state.hobbies.includes('Writing')}
        ></input>
        <label>Writing</label>
        <input
          type="checkbox"
          onChange={(e) => {
            handleChange(e);
          }}
          value="Singing"
          name="hobbies"
          checked={state.hobbies.includes('Singing')}
        ></input>
        <label>Singing</label>
        <input
          name="hobbies"
          type="checkbox"
          onChange={(e) => {
            handleChange(e);
          }}
          value="Dancing"
          checked={state.hobbies.includes('Dancing')}
        ></input>
        <label>Dancing</label>
        <input
          name="hobbies"
          type="checkbox"
          onChange={(e) => {
            handleChange(e);
          }}
          value="Travelling"
          checked={state.hobbies.includes('Travelling')}
        ></input>
        <label>Travelling</label>
        <hr></hr>

        <label for="semester">
          <b>Semester</b>
        </label>
        <br></br>
        <select name="semester" onChange={handleChange} value={state.semester}>
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
        <input
          type="number"
          name="paper1"
          id="paper1"
          onChange={handleChange}
          value={state.paper1}
        />
        <hr></hr>

        <label for="paper2">
          <b>Paper 2</b>
        </label>
        <br></br>
        <input
          type="number"
          name="paper2"
          id="paper2"
          onChange={handleChange}
          value={state.paper2}
        />
        <hr></hr>

        <label for="paper3">
          <b>Paper 3</b>
        </label>
        <br></br>
        <input
          type="number"
          name="paper3"
          id="paper3"
          value={state.paper3}
          onChange={handleChange}
        />
        <hr></hr>

        <button>Submit Form</button>
      </form>
    </>
  );
}
