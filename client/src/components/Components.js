import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import Spinner from "react-bootstrap/Spinner";
import { NavLink as RRNavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import HealthDataModal from "./HealthDataModal";
import Graphs2 from "./Graphs2";
import Graphs3 from "./Graphs3";
import Graphs4 from "./Graphs4";
import GraphsTwo from "./GraphsTwo";
import Demo from "./Demo.js";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import FatLogsList from "./FatLogsList";
import FatLogModal from "./FatLogModal";
import About from "./About";
import "../App.css";
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store from "../store";
import { history } from "../history";
import { startLoading, finishLoading } from "../actions/loadingActions";
import { getHealthData } from "../actions/healthDataActions";
import DailyCalorieCalc from "./DailyCalorieCalc";

class Components extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { isLoading } = this.props.loading;

    const authLinks = (
      <Fragment>
        <NavLink tag={RRNavLink} exact to="/logs" activeClassName="active">
          Logs
        </NavLink>

        <NavLink tag={RRNavLink} exact to="/graphs2" activeClassName="active">
          Stats
        </NavLink>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    const MyFatLogsList = props => {
      return <FatLogsList username={user.name} />;
    };

    const MyGraphs2 = props => {
      return <Graphs2 username={user.name} />;
    };

    const MyGraphs3 = props => {
      return <Graphs3 username={user.name} />;
    };

    const MyGraphs4 = props => {
      return <Graphs4 username={user.name} />;
    };

    const MyAbout = props => {
      return <About username={user.name} />;
    };

    return (
      <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history}>
          <Navbar
            color="dark"
            dark
            expand="sm"
            className="mb-5 navclss"
            style={{}}
          >
            <Container>
              <NavbarBrand href={user ? "/about" : "/"}>Fat Hacker</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {isAuthenticated ? authLinks : guestLinks}
                </Nav>
              </Collapse>
            </Container>
          </Navbar>

          <Container
            className="container-fluid"
            style={{
              fontColor: "white",
              marginLeft: "0px",
              paddingLeft: "0px",
              marginTop: "-30px"
            }}
          >
            {/* If the user if logged in, the MyAbout page gives the username as a prop if needed (currently not used)*/}

            {user ? <Route exact path="/about" render={MyAbout} /> : null}

            <Route exact path="/" component={About} />

            <Route exact path="/logs" component={FatLogModal} />
            {user ? <Route exact path="/logs" render={MyFatLogsList} /> : null}
          </Container>
          <Route exact path="/graphs2" component={GraphsTwo} />
          <Container style={{ height: "3rem" }}></Container>
          <Route exact path="/demo" component={Demo} />
          <Container style={{ height: "3rem" }}></Container>
          <Route exact path="/graphs" render={MyGraphs2} />
          <Container style={{ height: "3rem" }}></Container>
          <Route exact path="/graphs" render={MyGraphs3} />
          <Container style={{ height: "3rem" }}></Container>
          <Route exact path="/graphs" render={MyGraphs4} />
          <div style={{ height: "300px" }}></div>

          {/* Loading spinner */}
          {isLoading ? (
            <div className="spinnerBox">
              <Spinner
                className="spinner1"
                animation="border"
                role="status"
              ></Spinner>
            </div>
          ) : null}
        </ConnectedRouter>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.loading,
  healthData: state.healthData
});

export default connect(mapStateToProps, {
  startLoading,
  finishLoading,
  getHealthData
})(Components);
