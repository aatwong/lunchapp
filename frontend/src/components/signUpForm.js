import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
  render() {
    return (
      <div className="sign-up-page">

        <h2>Sign Up!</h2>
        <EnterUserInfo />
      </div>
    );
  }
}


class EnterUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state={
      email: '',
      password: '',
      office: ''
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeOffice = this.handleChangeOffice.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChangeEmail(event) {
      this.setState({email: event.target.email});
    }

    handleChangePassword(event) {
      this.setState({password: event.target.password});
    }

    handleChangeOffice(event) {
      this.setState({office: event.target.office});
    }

    handleSubmit(event) {
      event.preventDefault();

      axios.post('http://localhost:3000/users', {
        email: this.state.email,
        password: this.state.password,
        office: this.state.office
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })

      alert('Thank you for signing up!');

    }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleChangeEmail} /><br/>
          Password:
          <input type="text" value={this.state.password} onChange={this.handleChangePassword} /><br/>
          Office:
          <input type="text" value={this.state.office} onChange={this.handleChangeOffice} /><br/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

// <datalist id="office-locations">
//   <option value="San Francisco" />
//   <option value="San Jose" />
//   <option value="Liquid Studio" />
// </datalist>

export default SignUp;
