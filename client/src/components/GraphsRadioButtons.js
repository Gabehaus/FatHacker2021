import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getHealthData } from "../actions/healthDataActions";
import moment from "moment";
import Graphs1Data from "./Graphs1Data";
import Graphs2 from "./Graphs2";
import Graphs3 from "./Graphs3";
import Graphs4 from "./Graphs4";
import HealthDataModal from "./HealthDataModal";

class GraphsRadioButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: "",
      height: "",
      activityLevel: "",
      graphToShow: "Today"
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    healthData: PropTypes.object,
    user: PropTypes.object
  };

  componentDidMount() {
    this.props.getHealthData(this.props.username);
  }

  componentDidUpdate(prevProps) {
    const { healthData } = this.props;

    //check to see if any properties of the health data object have changed

    if (
      healthData.healthData.age !== prevProps.healthData.healthData.age ||
      healthData.healthData.weight !== prevProps.healthData.healthData.weight ||
      healthData.healthData.height !== prevProps.healthData.healthData.height ||
      healthData.healthData.sex !== prevProps.healthData.healthData.sex ||
      healthData.healthData.goal !== prevProps.healthData.healthData.goal ||
      healthData.healthData.activityLevel !==
        prevProps.healthData.healthData.activityLevel
    ) {
      //if they have changed, get all data from the database via redux
      this.props.getHealthData(this.props.username);
    }

    //once the redux store is fully updated define variables to be used in BMR calc
    if (healthData.loading !== prevProps.healthData.loading) {
      const convert = require("convert-units");
      const kgs = +convert(this.state.weight)
        .from("lb")
        .to("kg")
        .toFixed(2);

      const age = moment().diff(healthData.healthData.age, "years");

      const activityLevel = healthData.healthData.activityLevel;

      switch (activityLevel) {
        case "Little to no exercise":
          var activityFactor = 1.2;
          break;
        case "Light exercise":
          activityFactor = 1.375;
          break;
        case "Moderate exercise":
          activityFactor = 1.55;
          break;
        case "Heavy exercise":
          activityFactor = 1.725;
          break;
        case "Very heavy exercise":
          activityFactor = 1.9;
          break;
        default:
          activityFactor = 1.55;
          break;
      }

      this.setState({
        weight: healthData.healthData.weight,
        height: healthData.healthData.height,
        dob: healthData.healthData.age,
        sex: healthData.healthData.sex,
        goal: healthData.healthData.goal,
        activityLevel: healthData.healthData.activityLevel,
        kgs: kgs,
        age: age,
        activityFactor: activityFactor
      });

      //regex seems to be asynchronous so must specify to carry out .match after height is defined
      if (healthData.healthData.height) {
        const heightInCM = healthData.healthData.height.match(
          /(?<=(\s))[0-9]*\.*[0-9]*/
        );

        this.setState({
          heightCM: heightInCM
        });
      }
      //^end of operations called using height property from redux store

      if (this.state.sex === "Male") {
        this.setState({
          BMR:
            10 * this.state.kgs +
            6.25 * parseFloat(this.state.heightCM) -
            5 * this.state.age +
            5
        });
      } else {
        this.setState({
          BMR:
            10 * this.state.kgs +
            6.25 * parseFloat(this.state.heightCM) -
            5 * this.state.age -
            161
        });
      }
    }
    //^end of operations which are called after the redux store is fully updated
  }

  onChange = e => {
    this.setState({ graphToShow: e.target.value });
  };

  render() {
    const name = this.props.username;
    return (
      <div>
        <div className="statsTitle">{"Fat Stats"}</div>

        <div className="tableBox">
          {/*
          <div className="hlthDataCol">
            <div className="label">Sex</div>
            <div className="data">{this.state.sex}</div>
          </div>

          <div className="hlthDataCol">
            <div className="label">DOB</div>
            <div className="data">{this.state.dob}</div>
          </div>
          <div className="hlthDataCol">
            <div className="label">Weight</div>
            <div className="data">{healthData.healthData.weight}</div>
          </div>
          <div className="hlthDataCol">
            <div className="label">Height</div>
            <div className="data">{this.state.height}</div>
          </div>
          <div className="hlthDataCol">
            <div className="label">Activity Level</div>
            <div className="data">{this.state.activityLevel}</div>
          </div>
          <div className="hlthDataCol">
            <div className="label">Goal</div>
            <div className="data">{this.state.goal}</div>
          </div>
          <div className="hlthDataCol">
            <div className="label">Height In CMs</div>
            <div className="data">{this.state.heightCM}</div>
          </div>
          <div className="hlthDataCol">
            <div className="label">Age</div>
            <div className="data">{this.state.age}</div>
          </div>
          <div className="hlthDataCol">
            <div className="label">KGs</div>
            <div className="data">{this.state.kgs}</div>
          </div>
          <div className="hlthDataCol">
            <div className="label">Activity Factor</div>
            <div className="data">{this.state.activityFactor}</div>
          </div>  */}

          <div className="radioLabelsBox">
            <div className="labelInput" style={{ display: "inline-block" }}>
              <div className="radioLabel">Today</div>
              <input
                type="radio"
                value="Today"
                onChange={this.onChange}
                checked={this.state.graphToShow === "Today"}
                className="radioInput"
              />
            </div>
            <div className="labelInput" style={{ display: "inline-block" }}>
              <div className="radioLabel">7 day</div>
              <input
                type="radio"
                value="7 Day"
                onChange={this.onChange}
                checked={this.state.graphToShow === "7 Day"}
                className="radioInput"
              />
            </div>
            <div className="labelInput" style={{ display: "inline-block" }}>
              <div className="radioLabel">7 week</div>
              <input
                type="radio"
                value="7 Week"
                onChange={this.onChange}
                checked={this.state.graphToShow === "7 Week"}
                className="radioInput"
              />
            </div>
            <div className="labelInput" style={{ display: "inline-block" }}>
              <div className="radioLabel">Meals</div>
              <input
                type="radio"
                value="Meals"
                onChange={this.onChange}
                checked={this.state.graphToShow === "Meals"}
                className="radioInput"
              />
            </div>
          </div>
          {this.state.graphToShow === "Today" ? (
            <Graphs1Data
              username={name}
              kgs={this.state.kgs}
              age={this.state.age}
              activityFactor={this.state.activityFactor}
              goal={this.state.goal}
              sex={this.state.sex}
              heightCM={this.state.heightCM}
            />
          ) : null}
          {this.state.graphToShow === "7 Day" ? (
            <Graphs2 username={name} />
          ) : null}
          {this.state.graphToShow === "7 Week" ? (
            <Graphs3 username={name} />
          ) : null}
          {this.state.graphToShow === "Meals" ? (
            <Graphs4 username={name} />
          ) : null}
        </div>

        <HealthDataModal username={name} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  healthData: state.healthData
});

export default connect(mapStateToProps, {
  getHealthData
})(GraphsRadioButtons);
