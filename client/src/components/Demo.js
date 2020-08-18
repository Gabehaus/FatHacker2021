import React, { Component } from "react";
import Image from "react-bootstrap/Image";

import KeyFrameGIF3a from "../images/KeyFrameGIF3a.gif";
import noZoomCalcFat from "../images/noZoomCalcFat.gif";
import noZoomCreatefatlogGIF1a from "../images/noZoomCreatefatlogGIF1a.gif";
import noZoomPie from "../images/noZoomPie.gif";
import noZoomRegisterGIF1a from "../images/noZoomRegisterGIF1a.gif";
import FinalGIF5a from "../images/FinalGIF5a.gif";
import FinalGIF5b from "../images/FinalGIF5b.gif";

export default class Demo extends Component {
  render() {
    return (
      <div className="GIFparent">
        <h1 className="demoTitle">How It Works</h1>

        <div className="GIF">
          <p className="demoP">
            {" "}
            1 - Register with a valid email so we can securely store your fat
            consumption logs and health data.
          </p>
          <Image className="gifImage" src={noZoomRegisterGIF1a}></Image>
        </div>

        <div className="GIF">
          <p className="demoP">
            {" "}
            2 - In the "Logs" section click "ADD FAT LOG" and enter the name of
            the food you consumed, the unit of measurement and quantity of the
            food that you ate, the date, meal time; and if you know it, the fat
            content in grams.
          </p>
          <Image className="gifImage" src={noZoomCreatefatlogGIF1a}></Image>
        </div>
        <div className="GIF">
          <p className="demoP">
            {" "}
            3 - If you don't know the fat content of your food, click "USE FAT
            CALCULATOR" inside the fat log window. A new form will appear. Enter
            your food in the search box and click "ENTER SEARCH TERMS". A list
            of possible matches will appear. Select your food from the search
            results and then enter the quantity and unit of measurement of the
            food you consumed. Click "CALCULATE FAT CONTENT" and the number of
            grams of fat in your food will appear in the next field. Now click
            "TRANSFER DATA TO NEW LOG", check any other details such as the date
            of your log, and finally click "ADD LOG".
          </p>
          <Image className="gifImage" src={noZoomCalcFat}></Image>
        </div>
        <div className="GIF">
          <p className="demoP">
            {" "}
            4 - All your logs will be accessible on the "Logs" page.
          </p>
          <Image className="gifImage" src={KeyFrameGIF3a}></Image>
        </div>
        <div className="GIF">
          <p className="demoP">
            {" "}
            5 - Now navigate to the "Stats" section and click "ENTER HEALTH
            DATA". Fill in the DOB, Sex, Height, Weight, Goal, and Activity
            Level fields. Our application will use the Mifflin - St Jeor
            Equation to calculate your Basal Metabolic Rate, the number of
            calories required to keep your body functioning given your activity
            level, size, and age. From this number (your daily calorie intake)
            we calculate the number of grams of fat you should consume so that
            fat makes up no more than 10% of your total daily caloric intake.
            This will be referred to as your "DAILY ALLOWANCE".
          </p>
          <Image className="gifImage" src={FinalGIF5a}></Image>
        </div>
        <div className="GIF">
          <p className="demoP">
            {" "}
            6 - Each day you enter one or more fat consumption logs, our
            application will monitor your total fat consumption for that day and
            subtract this from your "DAILY ALLOWANCE". In the statistics
            provided under the label "Today" you will see the amount of fat you
            have eaten and the remaining amount you may eat before you meet your
            daily allowance quota. You can also access a graph of your fat
            consumption over the last seven days (not including "today") and one
            showing your average daily fat consumption for each of the last
            seven weeks.
          </p>
          <Image className="gifImage" src={FinalGIF5b}></Image>
        </div>
        <div className="GIF">
          <p className="demoP">
            {" "}
            7 - Our last graph shows you your average fat consumption per meal
            over the last seven days. Check to see which meals are driving your
            fat consumption totals the most.
          </p>
          <Image className="gifImage" src={noZoomPie}></Image>
        </div>
      </div>
    );
  }
}
