import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFatLogs } from "../actions/fatLogActions";
import moment from "moment";

class ChartsPage3 extends React.Component {
  static propTypes = {
    getFatLogs: PropTypes.func.isRequired,
    fatLog: PropTypes.object.isRequired
  };

  state = {};

  totalMealFat = mealArg => {
    const yesterday = moment() // utc
      .subtract(1, "days")
      .startOf("day")
      .toString();

    const yesterdayDate = moment(yesterday).format("YYYY-MM-DD");

    const minusTwoDateUTC = moment()
      .subtract(2, "days")
      .startOf("day")
      .toString();

    const minusTwoDate = moment(minusTwoDateUTC).format("YYYY-MM-DD");

    const minusThreeDateUTC = moment()
      .subtract(3, "days")
      .startOf("day")
      .toString();

    const minusThreeDate = moment(minusThreeDateUTC).format("YYYY-MM-DD");

    const minusFourDateUTC = moment()
      .subtract(4, "days")
      .startOf("day")
      .toString();

    const minusFourDate = moment(minusFourDateUTC).format("YYYY-MM-DD");

    const minusFiveDateUTC = moment()
      .subtract(5, "days")
      .startOf("day")
      .toString();

    const minusFiveDate = moment(minusFiveDateUTC).format("YYYY-MM-DD");

    const minusSixDateUTC = moment()
      .subtract(6, "days")
      .startOf("day")
      .toString();

    const minusSixDate = moment(minusSixDateUTC).format("YYYY-MM-DD");

    const minusSevenDateUTC = moment()
      .subtract(7, "days")
      .startOf("day")
      .toString();

    const minusSevenDate = moment(minusSevenDateUTC).format("YYYY-MM-DD");

    //getting the fat consumption logs for each day of the last week and then adding up the totals for each meal of each day
    const minSevenLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusSevenDate;
    });

    const minSevenMealLogs = minSevenLogs.filter(
      ({ meal }) => meal === mealArg
    );

    const minSevenTot = minSevenMealLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minSixLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusSixDate;
    });

    const minSixMealLogs = minSixLogs.filter(({ meal }) => meal === mealArg);

    const minSixTot = minSixMealLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minFiveLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusFiveDate;
    });

    const minFiveMealLogs = minFiveLogs.filter(({ meal }) => meal === mealArg);

    const minFiveTot = minFiveMealLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minFourLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusFourDate;
    });

    const minFourMealLogs = minFourLogs.filter(({ meal }) => meal === mealArg);

    const minFourTot = minFourMealLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minThreeLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusThreeDate;
    });

    const minThreeMealLogs = minThreeLogs.filter(
      ({ meal }) => meal === mealArg
    );

    const minThreeTot = minThreeMealLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minTwoLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === minusTwoDate;
    });

    const minTwoMealLogs = minTwoLogs.filter(({ meal }) => meal === mealArg);

    const minTwoTot = minTwoMealLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const minOneLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === yesterdayDate;
    });

    const minOneMealLogs = minOneLogs.filter(({ meal }) => meal === mealArg);

    const minOneTot = minOneMealLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    const mealTot =
      minOneTot +
      minTwoTot +
      minThreeTot +
      minFourTot +
      minFiveTot +
      minSixTot +
      minSevenTot;

    return mealTot;
  };

  componentDidMount() {
    this.props.getFatLogs(this.props.username);

    const totBreakfast = (this.totalMealFat("Breakfast") / 7).toFixed(2);
    const totLunch = (this.totalMealFat("Lunch") / 7).toFixed(2);
    const totDinner = (this.totalMealFat("Dinner") / 7).toFixed(2);
    const totSnacks = (this.totalMealFat("Snack") / 7).toFixed(2);
    const totRandom = (this.totalMealFat("Random Meal") / 7).toFixed(2);

    this.setState({
      totalAllMeals:
        totBreakfast + totLunch + totDinner + totSnacks + totRandom,
      dataPie: {
        labels: ["Breakfast", "Lunch", "Dinner", "Snack", "Random Meal"],
        datasets: [
          {
            data: [totBreakfast, totLunch, totDinner, totSnacks, totRandom],
            backgroundColor: [
              "#29976F",
              "#0AC279",

              "#0FFA8C",
              "#73FAB5",
              "#AFFAD3",
              "#606060"
            ],
            hoverBackgroundColor: [
              "#50977D",
              "#34C28A",

              "#44FAA5",
              "#B2FAD5",
              "#D7FAE8",
              "#00FF80"
            ]
          }
        ]
      }
    });
  }

  render() {
    let options = {
      elements: {
        arc: {
          borderWidth: 0
        }
      },
      legend: {
        fontColor: "white",

        labels: {
          fontColor: "white"
        }
      }
    };
    return (
      <MDBContainer className="MDB">
        <h3
          className="graphTitle"
          style={{ color: "white", fontFamily: "Lato" }}
        >
          Fat Per Meal
          <span style={{ fontSize: "1rem" }}>(7-day Avg)</span>
        </h3>
        {this.state.totalAllMeals ? (
          <Pie data={this.state.dataPie} options={options} />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            please enter health data
          </div>
        )}
        <div className="spacer"></div>
      </MDBContainer>
    );
  }
}

const mapStateToProps = state => ({
  fatLog: state.fatLog
});

export default connect(mapStateToProps, { getFatLogs })(ChartsPage3);
