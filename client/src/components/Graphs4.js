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

  //function returns the average fat consumed at a meal (entered as an argument) over the last week
  calcMealFatAvg = mealArg => {
    let formattedDates = [];
    let fatOnDays = [];

    //pushes formatted dates for the last seven days to an array
    for (let i = 1; i <= 7; i++) {
      let day = moment() // utc
        .subtract(i, "days")
        .startOf("day")
        .toString();

      let formattedDate = moment(day).format("YYYY-MM-DD");
      formattedDates.push(formattedDate);
    }

    //uses .filter() to return fat logs on each of the last 7 days
    for (let i = 0; i <= 6; i++) {
      let logs = this.props.fatLog.fatLogs.filter(({ date }) => {
        let adjst = moment(date)
          .format("YYYY-MM-DD")
          .toString();

        return adjst === formattedDates[i];
      });
      //filters fat logs on each of last seven days and returns those made at particular meal
      const logsAtMeal = logs.filter(({ meal }) => meal === mealArg);

      //totals the fat consumed at desired meal on each day
      let fatOnDay = logsAtMeal.reduce((sum, { fat }) => {
        return sum + Number(fat);
      }, 0);

      //pushes the fat consumed at a specific meal on a specific day to an array
      fatOnDays.push(fatOnDay);
    }
    //totals all fat consumed at desired meal over the last week
    let mealTot = fatOnDays.reduce((sum, elem) => (sum += elem), 0);

    //finds the average fat consumed at each meal per day over the last week
    let mealAvg = (mealTot / 7).toFixed(2);

    return mealAvg;
  };

  componentDidMount() {
    this.props.getFatLogs(this.props.username);

    const totBreakfast = this.calcMealFatAvg("Breakfast");
    const totLunch = this.calcMealFatAvg("Lunch");
    const totDinner = this.calcMealFatAvg("Dinner");
    const totSnacks = this.calcMealFatAvg("Snack");
    const totRandom = this.calcMealFatAvg("Random Meal");

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
