import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

import { connect } from "react-redux";
import { getFatLogs } from "../actions/fatLogActions";
import moment from "moment";
import apple from "../images/apple.svg";
import daily from "../images/daily.svg";
import remain from "../images/remain.svg";

class Graphs1Data extends Component {
  constructor(props) {
    super(props);
    this.state = { boomer: 5 };
  }

  componentDidMount(props) {
    this.props.getFatLogs(this.props.username);
    //using moment to find today's date
    const today = moment().toString();
    //formatting today's date to use in a .filter()
    const todayDate = moment(today).format("YYYY-MM-DD");

    // searching through fatlogs in the database and returning those that contain today's date
    const todaysLogs = this.props.fatLog.fatLogs.filter(({ date }) => {
      const adjst = moment(date)
        .format("YYYY-MM-DD")
        .toString();

      return adjst === todayDate;
    });
    // summing the fat values of all fatlogs from today
    const todaysCurrentTotal = todaysLogs.reduce((sum, { fat }) => {
      return sum + Number(fat);
    }, 0);

    this.setState({
      todaysCurrentTotal: todaysCurrentTotal
    });
  }

  render() {
    //subtracting fat consumed today from total fat one is allowed to consume today
    const fatLeft = (this.props.fat - this.state.todaysCurrentTotal).toFixed(2);
    // if a person has consumed more than their daily allowance, fatleft is reported as zero
    const fatLeftMinZero = fatLeft >= 0 ? fatLeft : 0;
    //calculating the percentage of ones daily allowance they have already consumed today
    const perc = (
      (this.state.todaysCurrentTotal / this.props.fat) *
      100
    ).toFixed(0);

    //data for react-chartjs doughnut chart
    const data = {
      labels: [
        `Fat Consumed: ${this.state.todaysCurrentTotal}g`,
        `Remaining Fat Allowance: ${fatLeftMinZero}g`
      ],
      datasets: [
        {
          label: "Today's Fat",
          backgroundColor: ["#A9A9A9", "#33FF99"],
          hoverBackgroundColor: ["#6b6b6b", "#66FFB2"],
          data: [this.state.todaysCurrentTotal, fatLeftMinZero]
        }
      ]
    };

    return (
      <div style={{ zIndex: "1 !important" }} className="graphPercentParent">
        <div style={{ margin: "0" }} className="dnut">
          <Doughnut
            data={data}
            options={{
              cutoutPercentage: 90,
              rotation: 1 * Math.PI,
              circumference: 1 * Math.PI,
              elements: {
                arc: {
                  borderWidth: 0
                }
              },
              title: {
                display: true,

                fontSize: 30
              },
              legend: {
                display: false,
                position: "right",
                labels: {
                  fontColor: "white",
                  fontSize: 10
                }
              }
            }}
          />
        </div>
        {this.props.healthData.healthData.weight ? (
          <div className="percentBox">{`${perc}%`}</div>
        ) : (
          " "
        )}

        <div className="iconsStatsParent">
          <div className="iconStatsBox">
            <div className="iconText">
              <img src={apple} className="icon" alt=""></img>
              <div className="text">FAT EATEN</div>
            </div>
            {this.props.healthData.healthData.weight ? (
              <div className="iconStat">{`${this.state.todaysCurrentTotal}g`}</div>
            ) : (
              " "
            )}
          </div>
          <div className="iconStatsBox">
            <div className="iconText">
              <img src={remain} className="icon" alt=""></img>
              <div className="text">REMAINING</div>
            </div>
            {this.props.healthData.healthData.weight ? (
              <div className="iconStat">{`${fatLeft}g`}</div>
            ) : (
              " "
            )}
          </div>
          <div className="iconStatsBox">
            <div className="iconText">
              <img src={daily} className="icon" alt=""></img>
              <div className="text">DAILY ALLOWANCE</div>
            </div>
            {this.props.healthData.healthData.weight ? (
              <div className="iconStat">{`${this.props.fat}g`}</div>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fatLog: state.fatLog,
  user: state.auth.user,
  healthData: state.healthData
});

export default connect(mapStateToProps, { getFatLogs })(Graphs1Data);
