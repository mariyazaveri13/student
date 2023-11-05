import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function StudentData() {
  const [state, setState] = useState({
    students: [],
    id: '',
    name: '',
    comments: '',
    email: '',
    gender: '',
    hobbies: [],
    semester: '',
    searchByName: '',
    searchByEmail: '',
    searchByEnroll: '',
    sort: '',
    sortBy: '',
    lessThanResult: '',
    moreThanResult: '',
    startDate: '',
    endDate: '',
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
      console.log(res.data);
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
  }

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/students/${id}`, {
        mode: 'no-cors',
      });
      alert(res.data.message);
      setState((preState) => ({
        ...preState,
        students: preState.students.filter((stud) => stud._id != id),
      }));
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  function handleFilters(e) {
    e.preventDefault();
    const query = {};
    const {
      searchByEmail,
      searchByName,
      searchByEnroll,
      sort,
      sortBy,
      startDate,
      endDate,
      lessThanResult,
      moreThanResult,
    } = state;

    if (searchByName) query.searchByName = searchByName;
    if (searchByEmail) query.searchByEmail = searchByEmail;
    if (searchByEnroll) query.searchByEnroll = searchByEnroll;
    if (sort) query.sort = sort;
    if (sortBy) query.sortBy = sortBy;
    if (startDate) query.startDate = startDate;
    if (endDate) query.endDate = endDate;
    if (lessThanResult) query.lessThanResult = lessThanResult;
    if (moreThanResult) query.moreThanResult = moreThanResult;

    callApiForFilters(query);
  }

  async function callApiForFilters(query) {
    try {
      const res = await axios.get(`http://localhost:5000/students`, {
        params: query,
      });
      if (res.data.count == 0) {
        alert('No data found');
        return;
      } else {
        setState((s) => ({
          ...s,
          students: res.data.students,
          searchByName: '',
          searchByEmail: '',
          searchByEnroll: '',
          sort: '',
          sortBy: '',
          lessThanResult: '',
          moreThanResult: '',
          startDate: '',
          endDate: '',
        }));
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function handleReset() {
    setState((s) => ({
      ...s,
      searchByName: '',
      searchByEmail: '',
      searchByEnroll: '',
      sort: '',
      sortBy: '',
      lessThanResult: '',
      moreThanResult: '',
      startDate: '',
      endDate: '',
    }));
    fetchData();
  }

  return (
    <>
      <h1>This is student data</h1>
      <button type="button">
        <Link to="/addstudent">Add Student</Link>
      </button>
      <form onSubmit={handleFilters}>
        <h2>Search</h2>
        <div>
          <input
            type="text"
            name="searchByName"
            onChange={handleChange}
            placeholder="Search by Name"
            value={state.searchByName}
          />
          <input
            type="text"
            name="searchByEmail"
            onChange={handleChange}
            placeholder="Search by email"
            value={state.searchByEmail}
          />
          <input
            type="number"
            name="searchByEnroll"
            onChange={handleChange}
            placeholder="Search by enrollnum"
            value={state.searchByEnroll}
          />
        </div>
        <h2>Sort</h2>
        <div>
          <input
            type="radio"
            name="sortBy"
            id="sortByName"
            value="sortByName"
            onChange={handleChange}
            checked={'sortByName' === state.sortBy}
          ></input>
          <label htmlFor="sortByName">Sort By Name</label>
          <input
            type="radio"
            name="sortBy"
            id="sortByResult"
            value="sortByResult"
            onChange={handleChange}
            checked={'sortByResult' === state.sortBy}
          ></input>
          <label htmlFor="sortByResult">Sort By Result</label>

          <input
            type="radio"
            name="sortBy"
            id="sortByCreatedAt"
            value="sortByCreatedAt"
            onChange={handleChange}
            checked={'sortByCreatedAt' === state.sortBy}
          ></input>
          <label htmlFor="sortByCreatedAt">Sort By Created Date</label>
        </div>
        <div>
          <input
            type="radio"
            name="sort"
            id="asc"
            value="asc"
            onChange={handleChange}
            checked={'asc' === state.sort}
          ></input>
          <label htmlFor="asc">Ascending</label>
          <input
            type="radio"
            name="sort"
            id="desc"
            value="desc"
            onChange={handleChange}
            checked={'desc' === state.sort}
          ></input>
          <label htmlFor="desc">Descending</label>
        </div>
        <h2>Filter</h2>
        <div>
          <input
            type="text"
            name="lessThanResult"
            onChange={handleChange}
            placeholder="Less than result marks"
            value={state.lessThanResult}
          />
          <input
            type="text"
            name="moreThanResult"
            onChange={handleChange}
            placeholder="More than result marks"
            value={state.moreThanResult}
          />

          <br></br>
          <br></br>

          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            value={state.startDate}
          />

          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            value={state.endDate}
          />
          <br></br>
          <br></br>
        </div>

        <div>
          <button>Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
        <br></br>
        <br></br>
      </form>

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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.students.map((stud) => {
            return (
              <tr key={stud._id}>
                <td>{stud.name}</td>
                <td>{stud.birthdate ? formatDate(stud.birthdate) : ''}</td>
                <td>{stud.email}</td>
                <td>{stud.enrollmentnum}</td>
                <td>{stud.gender}</td>
                <td>{stud.hobbies.toString()}</td>
                <td>{stud.semester}</td>
                <td>{stud.paper1}</td>
                <td>{stud.paper2}</td>
                <td>{stud.paper3}</td>
                <td>{stud.result}</td>
                <td>{stud.comments ? stud.comments : '--'}</td>
                <td>{formatDate(stud.createdAt)}</td>
                <td>
                  <button onClick={() => handleDelete(stud._id)}>Delete</button>
                  <button>
                    <Link to="/addstudent" state={{ student: stud }}>
                      Edit
                    </Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <br></br>
    </>
  );
}
