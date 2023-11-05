import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Icon, Message, Button, Form, TextArea, Grid } from 'semantic-ui-react';

export default function AddStudent(props) {
  const location = useLocation();
  const { student } =
    location && location.state !== null ? location.state : { student: {} };
  const [state, setState] = useState({
    name: student.name ? student.name : '',
    birthdate: student.birthdate ? formatDateforDateBox(student.birthdate) : '',
    email: student.email ? student.email : '',
    enrollmentnum: student.enrollmentnum ? student.enrollmentnum : '',
    gender: student ? student.gender : 'Female',
    hobbies: student.hobbies ? student.hobbies : [],
    semester: student.semester ? student.semester : 1,
    paper1: student.paper1 ? student.paper1 : '',
    paper2: student.paper2 ? student.paper2 : '',
    paper3: student.paper3 ? student.paper3 : '',
    result: '',
    id: student._id ? student._id : '',
    comments: student.comments ? student.comments : '',
  });

  const semOptions = [
    { key: 1, value: 1, text: 1 },
    { key: 2, value: 2, text: 2 },
    { key: 3, value: 3, text: 3 },
    { key: 4, value: 4, text: 4 },
  ];

  function formatDateforDateBox(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(d.getDate()).padStart(2, '0')}`;
  }
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

  function handleChange(e, data) {
    const { name, type, value, checked } = e.target;
    console.log(data);
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
    }
    //Below if block specifically for dropdowns
    else if (data.name == 'semester' && data.value) {
      setState((preState) => ({
        ...preState,
        semester: data.value,
      }));
    } else {
      setState((preState) => {
        return {
          ...preState,
          [name]: type == 'number' ? Number(value) : value,
        };
      });
    }
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
      comments,
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
      comments: state.comments,
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
      let data = {};
      if (!state.id) {
        data = await axios.post('http://localhost:5000/students', obj);
      } else {
        data = await axios.patch(
          `http://localhost:5000/students/${state.id}`,
          obj
        );
      }

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
        comments: '',
      }));
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <Grid centered style={{ width: '100vw' }}>
        <Grid.Column style={{ width: '70vw' }}>
          <br></br>
          <Grid.Row>
            <Link to="/">
              <Button type="button" icon labelPosition="left">
                <Icon name="home" />
                Home
              </Button>
            </Link>
          </Grid.Row>
          <br></br>
          <Grid.Row>
            <Message
              size="huge"
              attached
              header={state.id ? 'Edit Student data' : 'Add Student and Marks'}
            />
            <Form
              className="attached fluid segment"
              size="large"
              onSubmit={handleSubmit}
            >
              <Form.Group widths="equal">
                <Form.Input
                  label="Name"
                  name="name"
                  id="name"
                  value={state.name}
                  onChange={handleChange}
                ></Form.Input>

                <Form.Input
                  type="date"
                  label="Birthdate"
                  name="birthdate"
                  id="birthdate"
                  value={state.birthdate}
                  onChange={handleChange}
                ></Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  type="email"
                  label="Email"
                  name="email"
                  id="email"
                  value={state.email}
                  onChange={handleChange}
                ></Form.Input>
                <Form.Input
                  type="number"
                  label="Enrollment Number"
                  name="enrollmentnum"
                  id="enrollmentnum"
                  value={state.enrollmentnum}
                  onChange={handleChange}
                  disabled={state.id ? true : false}
                ></Form.Input>
              </Form.Group>

              <Form.Group widths={'equal'}>
                <Form.Field>
                  <label>Gender</label>
                  <Form.Radio
                    value="Male"
                    id="Male"
                    name="gender"
                    label="Male"
                    checked={state.gender === 'Male'}
                    onChange={handleChange}
                  ></Form.Radio>
                  <Form.Radio
                    value="Female"
                    id="Female"
                    name="gender"
                    label="Female"
                    checked={state.gender === 'Female'}
                    onChange={handleChange}
                  ></Form.Radio>
                </Form.Field>
                <Form.Field>
                  <label>Hobbies</label>
                  <Form.Checkbox
                    label="Reading"
                    onChange={handleChange}
                    value="Reading"
                    name="hobbies"
                    checked={state.hobbies.includes('Reading')}
                    id="Reading"
                  />
                  <Form.Checkbox
                    label="Sports"
                    onChange={handleChange}
                    value="Sports"
                    name="hobbies"
                    checked={state.hobbies.includes('Sports')}
                    id="Sports"
                  />
                  <Form.Checkbox
                    label="Writing"
                    onChange={handleChange}
                    value="Writing"
                    name="hobbies"
                    checked={state.hobbies.includes('Writing')}
                    id="Writing"
                  />
                  <Form.Checkbox
                    label="Singing"
                    onChange={handleChange}
                    value="Singing"
                    name="hobbies"
                    checked={state.hobbies.includes('Singing')}
                    id="Singing"
                  />
                  <Form.Checkbox
                    label="Dancing"
                    onChange={handleChange}
                    value="Dancing"
                    name="hobbies"
                    checked={state.hobbies.includes('Dancing')}
                    id="Dancing"
                  />
                  <Form.Checkbox
                    label="Travelling"
                    onChange={handleChange}
                    value="Travelling"
                    name="hobbies"
                    checked={state.hobbies.includes('Travelling')}
                    id="Travelling"
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths={'equal'}>
                <Form.Field>
                  <label>Semester</label>
                  <Form.Dropdown
                    selection
                    fluid
                    options={semOptions}
                    onChange={(e, data) => handleChange(e, data)}
                    value={state.semester}
                    id="semester"
                    name="semester"
                  ></Form.Dropdown>
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    type="number"
                    label="Paper 1"
                    name="paper1"
                    id="paper1"
                    value={state.paper1}
                    onChange={handleChange}
                    disabled={state.id ? true : false}
                  ></Form.Input>
                </Form.Field>
              </Form.Group>

              <Form.Group widths={'equal'}>
                <Form.Field>
                  <Form.Input
                    type="number"
                    label="Paper 2"
                    name="paper2"
                    id="paper2"
                    value={state.paper2}
                    onChange={handleChange}
                    disabled={state.id ? true : false}
                  ></Form.Input>
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    type="number"
                    label="Paper 3"
                    name="paper3"
                    id="paper3"
                    value={state.paper3}
                    onChange={handleChange}
                    disabled={state.id ? true : false}
                  ></Form.Input>
                </Form.Field>
              </Form.Group>
              {state.id && (
                <div>
                  <label for="comments">
                    <b>Comments</b>
                  </label>
                  <br></br>
                  <TextArea
                    value={state.comments}
                    onChange={handleChange}
                    name="comments"
                    placeholder="Comments"
                  ></TextArea>
                </div>
              )}
              <br></br>
              <div>
                <Button primary>Submit Form</Button>
              </div>
            </Form>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </>
  );
}
