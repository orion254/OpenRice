import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // confirm_password: '',
      first_name: '',
      last_name: '',
      owner: false,
      primary_city: '',
      showModal: true

    };

    //error handling
    this.renderErrors = this.renderErrors.bind(this);

    //form actions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signUpForm = this.signUpForm.bind(this);
    this.loginForm = this.loginForm.bind(this);
    this.handleDemo = this.handleDemo.bind(this);

    //Modal stuff
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  //Set Modal State
  handleOpenModal(){
    this.setState({showModal: true});
  }

  handleCloseModal(){
    this.setState({showModal: false});
    this.props.history.goBack();
  }

  componentDidMount(){
    this.props.clearErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  //handle form actions
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user;
    if(this.props.formType === 'signup'){
      user = {first_name: this.state.first_name,
              last_name: this.state.last_name,
              password: this.state.password,
              email: this.state.email,
              owner: this.state.owner,
              primary_city: this.state.primary_city};

    }else{
      user = {email: this.state.email, password: this.state.password};
    }

    this.props.processForm(user)
    .then(() => this.props.history.push('/'));
  }

  handleDemo(e){
    e.preventDefault();
    let demo = {email: 'demo@demo.com', password: '123456'};
    // this.setState(demo); //make an animation to input credentials
    this.props.processForm(demo)
    .then(() => this.props.history.push('/'));
  }

  signUpForm(){
    return(
      <div className="signup-form">
      <h3>Welcome to OpenRice!</h3>

      <hr />
      {this.renderErrors()}

      <input type="text"
        value={this.state.first_name}
        onChange={this.update('first_name')}
        className="signup-input"
        placeholder="First Name:"
      />

      <br/>

      <input type="text"
        value={this.state.last_name}
        onChange={this.update('last_name')}
        className="signup-input"
        placeholder="Last Name:"
      />


      <br/>
      <input type="text"
        value={this.state.email}
        onChange={this.update('email')}
        className="signup-input"
        placeholder="Enter Email:"
      />
      <br/>

      <input type="password"
        value={this.state.password}
        onChange={this.update('password')}
        className="signup-input"
        placeholder="Enter Password:"
      />

      {/* <br/>

      <input type="password"
        value={this.state.confirm_password}
        onChange={this.update('confirm_password')}
        className="signup-input"
        placeholder="Confirm Password:"
      /> */}

      <br/>

      <input type="text"
        value={this.state.primary_location}
        onChange={this.update('primary_city')}
        className="signup-input"
        placeholder="Primary Dining Location:"
      />
      <br/>

      <label className="isOwner">
        <input type="checkbox"
          value={!this.state.owner}
          onChange={this.update('owner')}
          checked={this.state.owner} >
        </input>
        Restaurant Owner?
      </label>
      <br/>

      <input
        onClick={this.handleSubmit}
        className="button"
        type="submit"
        value="Create Account" />
    </div>
    );
  }

  loginForm(){
    return(
      <div className="login-form">
        <h3>Please sign in</h3>
        <hr/>
        {this.renderErrors()}
        <input type="text"
          value={this.state.email}
          onChange={this.update('email')}
          className="signup-input"
          placeholder="Email"
        />
        <br/>

        <input type="password"
          value={this.state.password}
          onChange={this.update('password')}
          className="signup-input"
          placeholder="Password"
        />

        <br/>
        <input onClick={this.handleSubmit}
              className="button"
              type="submit"
              value="Sign In" />

        <br />

        <input onClick={this.handleDemo}
               type="submit"
               className="button demo-login"
               value="Demo Login" />
      </div>
    );
  }

  renderErrors() {
    if (this.props.errors !== []){
      return(
        <ul className="session-errors">
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`} >
              {error}
            </li>
          ))}
        </ul>
      );
    } else {
      return;
    }
  }


  render() {
    return (
      <div className="session-page">
        <div className="session-form-border">
          <div className='session-form'>
            <form onSubmit={this.handleSubmit} className="login-form-box">
              {
                (this.props.formType === 'signup') ? (
                  <ReactModal
                      isOpen={this.state.showModal}
                      contentLabel="Sign up Form"
                      onRequestClose={this.handleCloseModal}
                      style={customStyles}
                  >
                  {this.signUpForm()}
                </ReactModal>
                ) : (
                  <ReactModal
                      isOpen={this.state.showModal}
                      contentLabel="Login Form"
                      onRequestClose={this.handleCloseModal}
                      style={customStyles}
                  >
                    {this.loginForm()}
                </ReactModal>
                )
              }
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);

// Please {this.props.formType} or {this.navLink()}
