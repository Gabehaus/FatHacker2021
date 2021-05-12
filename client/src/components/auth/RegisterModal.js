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
import Image from "react-bootstrap/Image"
import facebookF from "../../images/facebookF.svg"
import googleG from "../../images/googleG.svg"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { register, oauthGoogle, oauthFacebook } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"
import { openModal } from "../../actions/regActions"
import { push } from "connected-react-router"
import store from "../../store"
import GoogleLogin from "react-google-login"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

class RegisterModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      msg: null
    }

    this.responseGoogleLogin = this.responseGoogleLogin.bind(this)
    this.responseFacebookLogin = this.responseFacebookLogin.bind(this)
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    open: PropTypes.object
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg })
      } else {
        this.setState({ msg: null })
      }
    }
    // If authenticated, close modal
    if (this.props.open.isOpenReg) {
      if (isAuthenticated) {
        this.toggle()
        store.dispatch(push("/logs"))
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors()
    this.props.openModal()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const { name, email, password, confirm_password } = this.state

    //Create user object
    const newUser = {
      name,
      email,
      password,
      confirm_password
    }

    this.props.register(newUser)
  }

  async responseGoogleLogin(res) {
    await this.props.oauthGoogle(res.accessToken)
  }

  async responseFacebookLogin(res) {
    await this.props.oauthFacebook(res.accessToken)
  }

  render() {
    const { isOpenReg } = this.props.open
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>
        <Modal isOpen={isOpenReg} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  autoComplete='off'
                  id='name'
                  placeholder='Name'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  autoComplete='off'
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
                />
                <p className='passwordInstructions'>
                  password must contain at least eight characters
                </p>
                <Label for='confirm_password'>Confirm password</Label>
                <Input
                  type='confirm_password'
                  name='confirm_password'
                  autoComplete='off'
                  id='confirm_password'
                  placeholder='Confirm password'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Button color='dark' style={{ marginTop: "2rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
            <div className='loginButtonsBox'>
              <GoogleLogin
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
                    className='loginReg googleLogin'
                  >
                    {" "}
                    <div className='gBox'>
                      <Image src={googleG} className='googleG' />
                    </div>
                    <div className='gText'>Register With Google</div>
                  </button>
                )}
              />
              {/* <FacebookLogin
                appId="1025853627857007"
                textButton="Login with Facebook"
                autoLoad={true}
                disableMobileRedirect={true}
                fields="name, email"
                callback={this.responseFacebookLogin}
                cssClass="my-facebook-button-class"
                render={renderProps => (
                  <button
                    className="loginReg fbLogin"
                    onClick={renderProps.onClick}
                  >
                    <div className="gBox">
                      <Image src={facebookF} className="googleG" />
                    </div>
                    <div className="gText">Register With Facebook</div>
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
  open: state.register
})

export default connect(mapStateToProps, {
  register,
  clearErrors,
  openModal,
  oauthGoogle,
  oauthFacebook
})(RegisterModal)
