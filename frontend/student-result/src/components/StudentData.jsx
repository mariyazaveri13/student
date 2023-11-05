import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  Grid,
  Icon,
  Button,
  Card,
  Image,
  Message,
  Container,
  Header,
  Accordion,
  Form,
} from 'semantic-ui-react';

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

  const [activeIndex, setActiveIndex] = useState(-1);

  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }

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
      <Container>
        <br></br>
        <Header as={'h1'} content="Student Overview" />
        <Link to="/addstudent">
          <Button type="button" icon labelPosition="left">
            <Icon name="add" />
            Add Student
          </Button>
          <br></br>
        </Link>
        <br></br>

        <Accordion fluid styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
            Filters
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Form onSubmit={handleFilters}>
              <Header as="h3">Search</Header>
              <Form.Group widths={'equal'}>
                <Form.Input
                  type="text"
                  name="searchByName"
                  onChange={handleChange}
                  placeholder="Search by Name"
                  value={state.searchByName}
                />
                <Form.Input
                  type="email"
                  name="searchByEmail"
                  onChange={handleChange}
                  placeholder="Search by Email"
                  value={state.searchByEmail}
                />
                <Form.Input
                  type="number"
                  name="searchByEnroll"
                  onChange={handleChange}
                  placeholder="Search by Enrollment Number"
                  value={state.searchByEnroll}
                />
              </Form.Group>
              <Header as="h3">Sort</Header>
              <Form.Group>
                <Form.Radio
                  name="sort"
                  id="asc"
                  value="asc"
                  onChange={handleChange}
                  label="Ascending"
                  checked={'asc' === state.sort}
                ></Form.Radio>
                <Form.Radio
                  name="sort"
                  id="desc"
                  value="desc"
                  onChange={handleChange}
                  checked={'desc' === state.sort}
                  label="Descending"
                ></Form.Radio>
              </Form.Group>
              <Form.Group>
                <Form.Radio
                  type="radio"
                  name="sortBy"
                  id="sortByName"
                  value="sortByName"
                  onChange={handleChange}
                  checked={'sortByName' === state.sortBy}
                  label="Sort By Name"
                ></Form.Radio>
                <Form.Radio
                  label="Sort By Result"
                  name="sortBy"
                  id="sortByResult"
                  value="sortByResult"
                  onChange={handleChange}
                  checked={'sortByResult' === state.sortBy}
                ></Form.Radio>
                <Form.Radio
                  label="Sort By Created Date"
                  name="sortBy"
                  id="sortByCreatedAt"
                  value="sortByCreatedAt"
                  onChange={handleChange}
                  checked={'sortByCreatedAt' === state.sortBy}
                ></Form.Radio>
              </Form.Group>

              <Header as="h3">Filter</Header>
              <Form.Group widths={'equal'}>
                <Form.Input
                  type="text"
                  name="lessThanResult"
                  label="Less than result marks"
                  onChange={handleChange}
                  placeholder="Less than result marks"
                  value={state.lessThanResult}
                />
                <Form.Input
                  type="text"
                  label="More than result marks"
                  name="moreThanResult"
                  onChange={handleChange}
                  placeholder="More than result marks"
                  value={state.moreThanResult}
                />
                <Form.Input
                  type="date"
                  label="Start Date"
                  name="startDate"
                  onChange={handleChange}
                  value={state.startDate}
                />

                <Form.Input
                  label="End Date"
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  value={state.endDate}
                />
              </Form.Group>

              <Button secondary>Submit</Button>
              <Button type="button" onClick={handleReset}>
                Reset
              </Button>
            </Form>
          </Accordion.Content>
        </Accordion>
        <br></br>

        <div>
          <Header size="huge" content="Student details"></Header>

          <Card.Group>
            {state.students.map((stud) => {
              return (
                <Card>
                  <Card.Content>
                    <Image
                      floated="right"
                      size="mini"
                      src={
                        stud.gender == 'Male'
                          ? 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                          : 'https://react.semantic-ui.com/images/avatar/large/molly.png'
                      }
                    />
                    <Card.Header>{stud.name}</Card.Header>
                    <Card.Meta>{stud.email}</Card.Meta>
                    <Card.Description>
                      <strong>Result : </strong>
                      {stud.result}
                      <br></br>
                      <strong>Gender : </strong>
                      {stud.gender}
                      <br></br>
                      <strong>Semester : </strong>
                      {stud.semester}
                      <br></br>
                      <strong>Hobbies : </strong>
                      {stud.hobbies.toString()}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button
                        onClick={() => handleDelete(stud._id)}
                        basic
                        color="red"
                        icon
                      >
                        <Icon name="trash" />
                      </Button>

                      <Button icon basic color="green">
                        <Link to="/addstudent" state={{ student: stud }}>
                          <Icon name="edit" color="green" />
                        </Link>
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        </div>
      </Container>
    </>
  );
}
