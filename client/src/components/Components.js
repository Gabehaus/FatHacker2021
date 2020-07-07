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
import { NavLink as RRNavLink } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import Graphs2 from "./Graphs2";
import Graphs3 from "./Graphs3";
import Graphs4 from "./Graphs4";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import FatLogsList from "./FatLogsList";
import FatLogModal from "./FatLogModal";
import About from "./About";
import "../App.css";

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

    const authLinks = (
      <Fragment>
        <NavLink tag={RRNavLink} exact to="/logs" activeClassName="active">
          My Logs
        </NavLink>
        <NavLink tag={RRNavLink} exact to="/graphs" activeClassName="active">
          My Stats
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
      return <About username={user.name} key={this.props.auth.user} />;
    };

    return (
      <BrowserRouter>
        <Navbar
          color="dark"
          dark
          expand="sm"
          className="mb-5 navclss"
          style={{}}
        >
          <Container>
            <NavbarBrand href="/">Fat Hacker</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>

        <Container
          class="container-fluid"
          style={{
            fontColor: "white",
            marginLeft: "0px",
            paddingLeft: "0px",
            marginTop: "-50px"
          }}
        >
          {user ? (
            <Route exact path="/" render={MyAbout} />
          ) : (
            <Route exact path="/" component={About} />
          )}

          <Route exact path="/logs" component={FatLogModal} />
          {user ? <Route exact path="/logs" render={MyFatLogsList} /> : null}
        </Container>
        <Route exact path="/graphs" render={MyGraphs2} />
        <Container style={{ height: "4rem" }}></Container>
        <Route exact path="/graphs" render={MyGraphs3} />
        <Container style={{ height: "4rem" }}></Container>
        <div style={{ height: "200px" }}></div>
        <Route exact path="/graphs" render={MyGraphs4} />
        <div style={{ height: "300px" }}></div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Components);
