import React, { Component } from "react";

import Graphs1 from "./Graphs1";

export default class Graphs1Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ["Fat Consumed", "Remaining Fat Allowance"],
      datasets: [
        {
          label: "Rainfall",
          backgroundColor: ["#A9A9A9", "#33FF99"],
          hoverBackgroundColor: ["#6b6b6b", "#66FFB2"],
          data: [80, 20]
        }
      ]
    };
  }

  render() {
    if (this.props.goal === "Maintain weight") {
      if (this.props.sex === "Male") {
        var BMR = (
          (10 * this.props.kgs +
            6.25 * parseFloat(this.props.heightCM) -
            5 * this.props.age +
            5) *
          this.props.activityFactor
        ).toFixed(2);
      } else if (this.props.sex === "Female") {
        BMR = (
          (10 * this.props.kgs +
            6.25 * parseFloat(this.props.heightCM) -
            5 * this.props.age -
            161) *
          this.props.activityFactor
        ).toFixed(2);
      }
    } else if (this.props.goal === "Lose 10 lbs") {
      if (this.props.sex === "Male") {
        BMR = (
          (10 * (this.props.kgs - 4.536) +
            6.25 * parseFloat(this.props.heightCM) -
            5 * this.props.age +
            5) *
          this.props.activityFactor
        ).toFixed(2);
      } else if (this.props.sex === "Female") {
        BMR = (
          (10 * (this.props.kgs - 4.536) +
            6.25 * parseFloat(this.props.heightCM) -
            5 * this.props.age -
            161) *
          this.props.activityFactor
        ).toFixed(2);
      }
    }

    var BMRnumber = Number(BMR);

    var caloriesAllowed = BMRnumber * 0.1;

    var fatAllowed = (caloriesAllowed / 9).toFixed(2);

    return (
      <div>
        {/*
        <div>BMR</div>
        <div>{BMR}</div>
        <div>Daily Calories</div>
        <div>{caloriesAllowed}</div>
        <div>Daily Fat</div>
        <div>{fatAllowed}</div> */}
        <Graphs1 fat={fatAllowed} username={this.props.username} />
      </div>
    );
  }
}
