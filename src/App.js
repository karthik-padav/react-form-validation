import React, { Component } from 'react';
import './App.css';

const formValid = ({formErrors, ...rest}) => {
  let valid = true;
  
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  
  Object.values(rest).forEach(val => {
    val.length < 1 && (valid = false);
  });

  return valid;
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      formErrors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }
    }
  };

  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch(name){
      case "firstName":
        formErrors.firstName = value.length < 3 ? "minimum 3 characters required": "";
        break;
      case "lastName":
        formErrors.lastName = value.length < 3 ? "minimum 3 characters required": "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value) ? "": "Invalid email address";
        break;
      case "password":
        formErrors.password = value.length < 6 ? "minimum 6 characters required": "";
        break;
      default:
        break;
    }

    this.setState({formErrors, [name]: value}, () => console.log(this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if(formValid(this.state)){
      console.log(this.state);
    } else {
      console.log('Form invalid')
    }
  }
  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Creat account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className={this.state.formErrors.firstName.length>0?"error":null}
                placeholder="First name"
                name="firstName"
                onChange={this.handleChange}
                noValidate />
                {this.state.formErrors.firstName.length>0 && (
                  <span className="errorMessage">{this.state.formErrors.firstName}</span>
                )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className={this.state.formErrors.lastName.length>0?"error":null}
                placeholder="Last name"
                name="lastName"
                onChange={this.handleChange}
                noValidate />
                {this.state.formErrors.lastName.length>0 && (
                  <span className="errorMessage">{this.state.formErrors.lastName}</span>
                )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={this.state.formErrors.email.length>0?"error":null}
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                noValidate />
                {this.state.formErrors.email.length>0 && (
                  <span className="errorMessage">{this.state.formErrors.email}</span>
                )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={this.state.formErrors.password.length>0?"error":null}
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                noValidate />
                {this.state.formErrors.password.length>0 && (
                  <span className="errorMessage">{this.state.formErrors.password}</span>
                )}
            </div>
            <div className="createAccount">
              <button type="submit">Create account</button>
              <small>Already have an account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
