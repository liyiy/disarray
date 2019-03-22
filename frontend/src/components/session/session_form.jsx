import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("session form test");
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    if (this.props.errors) {
      return (
        <ul>
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <div className="login-form">
            <h1>{this.props.message}</h1>
            {this.renderErrors()}
            <br />
            <label>EMAIL
              <br/>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
                required
              />
            </label>
            <br />
            {this.props.formType === 'Register' ?
            <>
            <label>USERNAME 
              <br/>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
                required
              />
            </label>
            <br/> 
            </> : null }
            <label>PASSWORD
              <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br />
            {this.props.formType === 'Register' ? 
            <>
              <label>PASSWORD AGAIN
                <br/>
                <input type="password"
                  value={this.state.password2}
                  onChange={this.update('password2')}
                  className="login-input"
                />
              </label> 
              <br/> 
            </> : null }
            <input className="session-submit" type="submit" value={this.props.formType} />
            <br />
            {this.props.navLink}
          </div>
        </form>

      </div>
    );
  }
}

export default SessionForm;