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
    fatLog: PropTypes.object.isRequired
  };

  state = { weeklyAverages: [] };

  //this function returns the total fat consumption over an entire week - the weeksAgo argument determines which week will be calculated
  totalFatWeeksAgo = weeksAgo => {
    const wksMinOne = weeksAgo - 1; // we subtract one so that "last week" (ONE week ago) adds 7 x ZERO to the number of days we count backward.

    const datesFormatted = []; //array will contain formatted dates for each day of the week determined by the weeksAgo argument

    // i + 7 * wksMinOne means that as i cycles from 1 to 7, we add a multiple of 7 to i, to determine how many weeks back to go
    for (let i = 1; i <= 7; i++) {
      let date = moment()
        .subtract(i + 7 * wksMinOne, "days")
        .startOf("day")
        .toString();
      let dateFormatted = moment(date).format("YYYY-MM-DD");
      datesFormatted.push(dateFormatted);
    }

    // using filter() search for logs on each date
    const fatOnDays = [];
    for (let i = 0; i <= 6; i++) {
      let logsOnDay = this.props.fatLog.fatLogs.filter(({ date }) => {
        const adjst = moment(date)
          .format("YYYY-MM-DD")
          .toString();

        // return adjst === datesFormatted[i];
        return adjst === datesFormatted[i];
      });

      //using .reduce() to sum all fat consumption entries on each date
      let totalFatOnDay = logsOnDay.reduce((sum, { fat }) => {
        return sum + Number(fat);
      }, 0);

      fatOnDays.push(totalFatOnDay);
    }

    // adjusting the divisor so that weeks with no entries are not included in average
    const divisor = fatOnDays.reduce(
      (div, elem) => (elem === 0 ? div - 1 : div),
      7
    );

    //calculating the average fat consumption over an entire week and returning it
    const weekAvg =
      divisor > 0
        ? fatOnDays.reduce((sum, elem) => {
            return (sum += elem);
          }, 0) / divisor
        : 0;
    return weekAvg;
  };

  componentDidMount() {
    this.props.getFatLogs(this.props.username);

    //getting the average fat consumption over each of the last 7 weeks
    const weeklyAverages = [];
    for (let i = 1; i <= 7; i++) {
      let weekAvg = this.totalFatWeeksAgo(i).toFixed(2);

      weeklyAverages.push(weekAvg);
    }

    // adjusting divisor in the event that a weekly average is zero, so this doesn't throw off overall average
    const divs = weeklyAverages.reduce(
      (div, elem) => (elem == 0 ? div - 1 : div),
      7
    );

    // using .reduce() to calculate the overall average of weekly averages
    const avgOfAllWeeks = (
      weeklyAverages.reduce((sum, elem) => (sum += Number(elem)), 0) / divs
    ).toFixed(2);

    // inserting data into the bar chart

    this.setState({
      avgOfAllWeeks: avgOfAllWeeks,
      weeklyAverages: [...weeklyAverages]
    });
  }

  render() {
    const dataHorizontal = {
      labels: [
        "Last Week",
        "-2 Weeks",
        "-3 Weeks",
        "-4 Weeks",
        "-5 Weeks",
        "-6 Weeks",
        "-7 Weeks",
        "Avg"
      ],

      datasets: [
        {
          label: "Average Fat(g) Per Day",
          data: [
            this.state.weeklyAverages[0],
            this.state.weeklyAverages[1],
            this.state.weeklyAverages[2],
            this.state.weeklyAverages[3],
            this.state.weeklyAverages[4],
            this.state.weeklyAverages[5],
            this.state.weeklyAverages[6],
            this.state.avgOfAllWeeks
          ],
          fill: false,
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
    };

    let options = {
      cornerRadius: 20,
      legend: {
        fontColor: "grey",

        labels: { fontColor: "white" }
      },

      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "white",
              fontFamily: "Arial",
              beginAtZero: true
            },
            gridLines: {}
          }
        ],
        xAxes: [
          {
            ticks: { fontColor: "white", beginAtZero: true },
            gridLines: { fontColor: "grey", display: false }
          }
        ]
      }
    };
    return (
      <div className="app">
        <MDBContainer
          className="MDB"
          style={{ background: "none", color: "grey !important" }}
        >
          <h3
            className="graphTitle"
            style={{ color: "white", fontFamily: "Lato" }}
          >
            Last Seven Weeks
          </h3>
          {this.state.avgOfAllWeeks ? (
            <HorizontalBar data={dataHorizontal} options={options} />
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
