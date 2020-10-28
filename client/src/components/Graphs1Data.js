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
    // calculating BMR using the Harris-Benedict Equation which depends on a person's goal of maintaining or losing weight
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

    const BMRnumber = Number(BMR);

    //calculating 10% of total daily calories (BMR)
    const caloriesAllowed = BMRnumber * 0.1;

    //converting 10% of BMR (caloriesAllowed) to grams of fat
    const fatAllowed = (caloriesAllowed / 9).toFixed(2);

    return (
      <div>
        <Graphs1 fat={fatAllowed} username={this.props.username} />
      </div>
    );
  }
}
