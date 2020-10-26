import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import moment from "moment";
import { getFatLogs } from "../actions/fatLogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ChartsPage2 extends React.Component {
  static propTypes = {
    getFatLogs: PropTypes.func.isRequired,
    fatLog: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  };

  state = {};

  componentDidMount() {
    this.props.getFatLogs(this.props.username);
    //formatted dates and days of the week for last 7 days

    const datesFormatted = []; //array will contain formatted dates which will be used in searches of logs using .filter()
    const weekDays = []; //array will contain names of days of the week used in graphs
    for (let i = 1; i <= 7; i++) {
      let date = moment()
        .subtract(i, "days")
        .startOf("day")
        .toString(); //depending on i, gives the date on one of the last seven days

      let dateFormatted = moment(date).format("YYYY-MM-DD"); //formats the date for use in .filter() search of logs
      datesFormatted.push(dateFormatted); //collects formatted dates in the datesFormatted array
      let weekday = moment(date).format("dddd"); //calculates what day of the week each date falls on
      weekDays.push(weekday); // pushes days of the week to the weekDays array
    }

    //getting the fat consumption logs for each day of the last week and then adding up the totals for each day

    let totalFatOnDays = []; //starts yesterday and spans back to seven days ago
    for (let i = 0; i <= 6; i++) {
      let logs = this.props.fatLog.fatLogs.filter(({ date }) => {
        const adjst = moment(date)
          .format("YYYY-MM-DD")
          .toString();

        return adjst === datesFormatted[i];
      });

      let totalOnDay = logs.reduce((sum, { fat }) => {
        return sum + Number(fat);
      }, 0);

      totalFatOnDays.push(totalOnDay);
    }

    //this weeds out any days in which no data was entered so that a running daily average is not including said days
    const divisor = totalFatOnDays.reduce(
      (div, elem) => (elem === 0 ? div - 1 : div),
      7
    );

    const weekAvg =
      divisor > 0
        ? (
            totalFatOnDays.reduce((sum, elem) => (sum += elem), 0) / divisor
          ).toFixed(2)
        : 0;

    // inserting data into the bar chart
    this.setState({
      weekAvg: weekAvg,
      dataHorizontal: {
        labels: [
          weekDays[0].slice(0, 3),
          weekDays[1].slice(0, 3),
          weekDays[2].slice(0, 3),
          weekDays[3].slice(0, 3),
          weekDays[4].slice(0, 3),
          weekDays[5].slice(0, 3),
          weekDays[6].slice(0, 3),
          "Avg"
        ],

        datasets: [
          {
            label: "Grams Fat Per Day",

            data: [
              totalFatOnDays[0],
              totalFatOnDays[1],
              totalFatOnDays[2],
              totalFatOnDays[3],
              totalFatOnDays[4],
              totalFatOnDays[5],
              totalFatOnDays[6],
              weekAvg
            ],

            fill: true,
            backgroundColor: [
              "#E5FFCC",
              "#CCFFCC",
              "#CCFFE5",
              "#99FFCC",
              "#66FFB2",
              "#33FF99",
              "#00FF80",
              "#00CC66"
            ],
            borderColor: [
              "rgba(201, 203, 207)",
              "rgba(201, 203, 207)",
              "rgba(201, 203, 207)",
              "rgba(201, 203, 207)",
              "rgba(201, 203, 207)",
              "rgba(201, 203, 207)",
              "rgb(201, 203, 207)",
              "rgba(201, 203, 207)"
            ],

            borderWidth: 1
          }
        ]
      }
    });
  }

  render() {
    let options = {
      legend: {
        fontColor: "white",

        labels: { fontColor: "white" }
      },

      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "white",
              beginAtZero: true
            },
            gridLines: {}
          }
        ],
        xAxes: [
          {
            ticks: { beginAtZero: true },
            gridLines: { color: "grey", display: false }
          }
        ]
      }
    };
    return (
      <div className="app">
        <MDBContainer
          style={{ background: "none", color: "grey" }}
          className="MDB"
        >
          <h3
            className="graphTitle"
            style={{ color: "white", fontFamily: "Lato" }}
          >
            Last Seven Days
          </h3>
          {this.state.weekAvg ? (
            <HorizontalBar data={this.state.dataHorizontal} options={options} />
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fatLog: state.fatLog
});

export default connect(mapStateToProps, { getFatLogs })(ChartsPage2);
