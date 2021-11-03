import React, { Component } from 'react';
import reactFeature from '../../assets/images/react-feature.svg';
import sassFeature from '../../assets/images/sass-feature.svg';
import bootstrapFeature from '../../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../../assets/images/responsive-feature.svg';
import DatePicker from 'react-datepicker';
import './../../assets/styles/custom-styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Card,
  CardBody,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
  Alert,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import PageAlertContext from '../../vibe/components/PageAlert/PageAlertContext';
class Dashboard extends Component {
  initialState = {
    alertMsg: '',
    alertVisible: false,
    alertStatus: '',
    email: '',
    firstName: '',
    lastName: '',
    description: '',
    birthday: '',
    profileImage: '',
    experience: '',
    formErrors: {
      email: '',
      firstName: '',
      lastName: '',

      description: '',
      profileImage: '',
      experience: '',
      birthday: '',
    },
    emailValid: false,
    firstNameValid: false,
    lastNameValid: false,
    birthdayValid: false,
    profileImageValid: false,
    experienceValid: false,

    formValid: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      fieldlist: ['firstName', 'lastName', 'email', 'birthday', 'profileImage', 'Experience', 'Description'],
      alertMessage: '👋 Welcome to our app!',
      alertType: 'primary',
      editModal: false,
      sendModal: false,
      ...this.initialState,
    };

    this.toggleSend = this.toggleSend.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  handleUserInput = e => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  toggleSend() {
    this.setState(prevState => ({
      sendModal: !prevState.sendModal,
      ...this.initialState,
    }));
  }
  toggleEdit() {
    this.setState(prevState => ({
      editModal: !prevState.editModal,
      ...this.initialState,
    }));
  }
  async postUsers() {
    const { firstname, lastname, email, birthDate, profileImage, experience, description } = this.state;
    const object = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      birthDate: birthDate,
      profileImage: profileImage,
      experience: experience,
      description: description,
    };

    const settings = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    };

    const fetchResponse = await fetch('https://my-json-server.typicode.com/tolikbairov/json-server/users', settings);
    if (!fetchResponse.ok) {
      throw new Error(fetchResponse.status);
    }

    const data = await fetchResponse.json();

    return data;
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let { emailValid, firstNameValid, lastNameValid, birthdayValid, profileImageValid, experienceValid } = this.state;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'firstName':
        firstNameValid = value.length >= 1;
        fieldValidationErrors.firstName = firstNameValid ? '' : 'is required';
        break;
      case 'lastName':
        lastNameValid = value.length >= 1;
        fieldValidationErrors.lastName = lastNameValid ? '' : 'is required';
        break;
      case 'birthday':
        birthdayValid = value instanceof Date;
        // console.log(value);

        fieldValidationErrors.birthday = value instanceof Date ? '' : 'is required';
        break;
      case 'profileImage':
        profileImageValid = value.length >= 1;
        fieldValidationErrors.profileImage = profileImageValid ? '' : 'is required';
        break;
      case 'experience':
        experienceValid = value.length >= 1;
        fieldValidationErrors.experience = experienceValid ? '' : 'is required';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        birthdayValid: birthdayValid,
        profileImageValid: profileImageValid,
        experienceValid: experienceValid,
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.profileImageValid &&
        this.state.birthdayValid &&
        this.state.experienceValid,
    });
  }
  // onError(error) {
  //   PNotify.error({
  //     text: `Request failed, ${error}`,
  //     delay: 3000,
  //     maxTextHeight: null,
  //     stack: new PNotify.Stack({
  //       dir1: 'left',
  //       dir2: 'up', //
  //       firstpos1: 0,
  //       firstpos2: 0, //
  //     }),
  //   });
  // }
  setStateAlert(msg, type) {
    this.setState({
      alertMessage: msg,
      alertType: type,
    });
  }
  // onSuccess() {
  //   PNotify.success({
  //     text: `Request succeeded`,
  //     delay: 3000,
  //     stack: new PNotify.Stack({
  //       dir1: 'left',
  //       dir2: 'up', //
  //       firstpos1: 0,
  //       firstpos2: 0, //
  //     }),
  //   });
  // }
  async SendRequest() {
    try {
      await this.postUsers();
      this.setStateAlert('Request succeeded', 'success');
      // this.toggleSend();
    } catch (error) {
      this.setStateAlert(`Request failed, ${error}`);
      // onError(error);
    }
  }

  errorClass(error) {
    return error.length === 0 ? false : true;
  }
  render() {
    const heroStyles = {
      padding: '50px 0 70px',
    };

    return (
      <>
        {' '}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Request name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Applying for a job</td>
              <td>
                <Button color="primary" onClick={this.toggleEdit}>
                  Edit
                </Button>{' '}
                <Button color="primary" onClick={this.toggleSend}>
                  Send
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>{' '}
        <Modal isOpen={this.state.sendModal} toggle={this.toggleSend}>
          <ModalHeader toggle={this.toggleSend}>Applying for a job </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstname"
                  value={this.state.firstName}
                  onChange={this.handleUserInput}
                  invalid={this.errorClass(this.state.formErrors.firstName)}
                />{' '}
                <FormFeedback>{this.state.formErrors.firstName}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={this.state.lastName}
                  onChange={this.handleUserInput}
                  invalid={this.errorClass(this.state.formErrors.lastName)}
                />{' '}
                <FormFeedback>{this.state.formErrors.lastName}</FormFeedback>
              </FormGroup>{' '}
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleUserInput}
                  invalid={this.errorClass(this.state.formErrors.email)}
                />
                <FormFeedback>{this.state.formErrors.lastName}</FormFeedback>
              </FormGroup>{' '}
              <FormGroup>
                <Label for="birthday">Birthday</Label>{' '}
                <DatePicker
                  className="form-control"
                  id="birthday"
                  name="birthday"
                  selected={this.state.birthday}
                  value={this.state.birthday}
                  onChange={birthday => {
                    // let birthdayFormatted = [
                    //   (birthday.getDate() > 9 ? '' : '0') + birthday.getDate(),
                    //   '/',
                    //   (birthday.getMonth() + 1 > 9 ? '' : '0') + (birthday.getMonth() + 1),
                    //   '/',
                    //   birthday.getFullYear(),
                    // ].join('');

                    this.setState({ birthday: birthday }, () => {
                      this.validateField('birthday', birthday);
                    });
                  }}
                  dateFormat="dd/MM/yyyy"
                  invalid={this.errorClass(this.state.formErrors.birthday)}
                />
                <FormFeedback>{this.state.formErrors.birthday}</FormFeedback>
                {/* <DatePicker
                  name="birthday"
                  className="form-control"
                  id="birthday"
                  value={this.state.date}
                  // selected={this.state.birthdayField}
                  // onBlur={e => this.validation(e.target)}
                  // onChange={birthdayField => this.setState({ birthdayField })}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.handleUserInput}
                /> */}
              </FormGroup>{' '}
              <FormGroup>
                <Label for="exampleFile">Profile image</Label>
                <Input
                  type="file"
                  name="profileImage"
                  id="exampleFile"
                  accept="image/*"
                  value={this.state.profileImage}
                  onChange={this.handleUserInput}
                  invalid={this.errorClass(this.state.formErrors.profileImage)}
                />
                <FormFeedback>{this.state.formErrors.profileImage}</FormFeedback>
              </FormGroup>{' '}
              <FormGroup>
                <Label for="experience">Experience</Label>
                <Input
                  type="select"
                  name="experience"
                  id="experience"
                  value={this.state.experience}
                  onChange={this.handleUserInput}
                  invalid={this.errorClass(this.state.formErrors.profileImage)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>{' '}
                <FormFeedback>{this.state.formErrors.experience}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={this.state.description}
                  onChange={this.handleUserInput}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {' '}
            <PageAlertContext.Consumer>
              {context => (
                <div>
                  {' '}
                  <Button
                    type="button"
                    className="btn btn-primary"
                    color="primary"
                    disabled={!this.state.formValid}
                    onClick={() => {
                      this.SendRequest().then(() => {
                        console.log(context);
                        context.setAlert(this.state.alertMessage, this.state.alertType);
                        setTimeout(() => {
                          context.closeAlert();
                        }, 3000);
                        this.toggleSend();
                      });
                    }}
                  >
                    Send
                  </Button>
                </div>
              )}
            </PageAlertContext.Consumer>
            <Button color="secondary" onClick={this.toggleSend}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>{' '}
        <Modal isOpen={this.state.editModal} toggle={this.toggleEdit}>
          <ModalHeader toggle={this.toggleEdit}>Edit Applying for a job request</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.{' '}
            <ListGroup>
              {this.state.fieldlist.map(field => (
                <ListGroupItem>{field}</ListGroupItem>
              ))}
            </ListGroup>{' '}
            <Button color="primary" onClick={this.toggleEdit} className="mt-2">
              Do Something
            </Button>{' '}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleEdit}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>{' '}
        {/* <Alert color={this.state.alertStatus} isOpen={this.state.alertVisible}>
          {this.state.alertMsg}
        </Alert> */}
      </>
    );
  }
}

export default Dashboard;
