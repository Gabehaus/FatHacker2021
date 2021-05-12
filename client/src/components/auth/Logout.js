import React, { Component, Fragment } from "react"
import { NavLink } from "reactstrap"
import { connect } from "react-redux"
import { logout } from "../../actions/authActions"
import { deleteAllFatlogs } from "../../actions/fatLogActions"
import PropTypes from "prop-types"
import { NavLink as RRNavLink } from "react-router-dom"
import { push } from "connected-react-router"
import store from "../../store"

class Logout extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  handleLogout = () => {
    store.dispatch(push("/"))
    setTimeout(() => {
      this.props.deleteAllFatlogs()
      this.props.logout()
    }, 10)
  }

  render() {
    return (
      <Fragment>
        <NavLink
          tag={RRNavLink}
          exact
          to='/'
          activeClassName='active'
          onClick={this.handleLogout}
        >
          Logout
        </NavLink>
      </Fragment>
    )
  }
}

export default connect(null, { logout, deleteAllFatlogs })(Logout)
