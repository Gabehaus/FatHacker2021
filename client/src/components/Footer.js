import React, { Component } from "react";
import FBlogo from "../images/FBlogo.svg";
import Twitterlogo from "../images/TwitterLogo.svg";
import TwitterLogo from "../images/TwitterLogo.svg";

import Image from "react-bootstrap/Image";
import axios from "axios";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  onChange = e => {
    this.setState({ email: e.target.value });
    console.log(this.state.email);
  };

  resetForm = () => {
    this.setState({
      email: ""
    });

    setTimeout(() => {
      this.setState({ sent: false });
    });
  };

  formSubmit = e => {
    e.preventDefault();

    let data = {
      email: this.state.email
    };

    axios
      .post("/api/form/", data)
      .then(res => {
        this.setState(
          {
            sent: true
          },
          this.resetForm()
        );
      })
      .catch(() => {
        console.log("message not sent");
      });
  };

  render() {
    return (
      <div className="grid-container">
        <div className="connect">
          <div className="stayConnected">
            <h3 className="footerHeader">STAY CONNECTED</h3>
            <p>Sign up for our monthly newsletter.</p>
          </div>
          <div className="emailAndIcons">
            <form className="footerForm" onSubmit={this.formSubmit}>
              <input
                type="text"
                id="email2"
                name="email2"
                className="formInput"
                value={this.state.email}
                onChange={this.onChange}
              />
              <input type="submit" value="Submit" className="subButton" />
            </form>
            <div className="contactIcons">
              <Image src={FBlogo} className="logo1" />
              <Image src={TwitterLogo} className="logo1" />
            </div>
          </div>
        </div>

        <div className="credits">
          <h3 className="footerHeader">SITE DESIGN</h3>
          <p>
            All FatHacker software and media designed and coded (front-to-back)
            by <span style={{ color: "#00eb98" }}>Gabriel Hauschildt</span>{" "}
          </p>

          <a href="http://www.dresselstyn.com/site/" target="_blank">
            Software-dev Portfolio
          </a>
          <br />
          <br />
          <a
            href="mailto:Gabehaus@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
        </div>

        <div className="navigate">
          <div>
            <h3 className="footerHeader">NAVIGATE</h3>
            <ul className="navLnx">
              <li>
                <a>Demo</a>
              </li>
              <li>
                <a>Q and A</a>
              </li>
              <li>
                <a>Register</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footerHeader">EXTERNAL LINKS</h3>
            <ul className="exLnx">
              <li>
                <a>Dr. McDougall</a>
              </li>
              <li>
                <a>Dr. Ornish</a>
              </li>
              <li>
                <a>Dr. Esselstyn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="info">
          <hr />
          <div
            className="address"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <span className="lucidSpan">Lucid Media Group</span> &#8226; 7223 N.
            Knowles Ave, Portland, OR 97217 &#8226; (504)931.7553
          </div>
          <hr />
        </div>
      </div>
    );
  }
}
