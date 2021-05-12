import React, { Component } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap"

import { connect } from "react-redux"
import PropTypes from "prop-types"
import { login, oauthGoogle, oauthFacebook } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"
import { push } from "connected-react-router"
import store from "../../store"

class GuestLoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      email: "Guest@example.com",
      password: "12345678",
      msg: null
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props
    if (error !== prevProps.error) {
      //Check for register errors
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }
    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle()
        //setTimeout(() => {store.dispatch(push("/graphs2")); }, 3000);
        store.dispatch(push("/logs"))
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors()
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e, props) => {
    e.preventDefault()

    const { email, password } = this.state

    const user = {
      email,
      password
    }
    // attempt to login
    this.props.login(user)
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Guest Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Guest Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                {/* <Label for='email'>Email</Label> */}
                {/* <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  onChange={this.onChange}
                /> */}
                <Button color='dark' style={{ marginTop: "2rem" }} block>
                  Login As Guest
                </Button>
              </FormGroup>
            </Form>
            <div className='loginButtonsBox'>
              {/* <GoogleLogin
                clientId='820113117620-o2qt448u2if1mim4l4p7bg1rnno0gp5s.apps.googleusercontent.com'
                buttonText='Google'
                cookiePolicy={"single_host_origin"}
                onSuccess={this.responseGoogleLogin}
                onFailure={this.responseGoogleLogin}
                className='my-facebook-button-class'
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className='login googleLogin'
                  >
                    {" "}
                    <div className='gBox'>
                      <Image src={googleG} className='googleG' />
                    </div>
                    <div className='gText'>Login With Google</div>
                  </button>
                )}
              /> */}
              {/* <FacebookLogin
                appId="1025853627857007"
                textButton="Login with Facebook"
                autoLoad={false}
                disableMobileRedirect={true}
                fields="name, email"
                callback={this.responseFacebookLogin}
                cssClass="my-facebook-button-class"
                render={renderProps => (
                  <button
                    className="login fbLogin facebookLogin"
                    onClick={renderProps.onClick}
                  >
                    <div className="gBox">
                      <Image src={facebookF} className="googleG" />
                    </div>
                    <div className="gText">Login With Facebook</div>
                  </button>
                )}
              ></FacebookLogin> */}
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
})

export default connect(mapStateToProps, {
  login,
  clearErrors,
  oauthGoogle,
  oauthFacebook
})(GuestLoginModal)
