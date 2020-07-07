import React, { Component } from "react";
import { connect } from "react-redux";
import { getFatLogs, deleteFatLog } from "../actions/fatLogActions";
import { openModal } from "../actions/regActions";
import lettuceFeather4 from "../images/lettuceFeather4.png";
import phone1 from "../images/phone1.png";
import pasta1 from "../images/pasta1.png";
import phoneCalc1 from "../images/phoneCalc1.png";
import mcdougallCircle1 from "../images/mcdougallCircle1.png";
import OrnishCircle1 from "../images/OrnishCircle1.png";
import esselstynCircle1 from "../images/esselstynCircle1.png";

import {
  Jumbotron,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import Image from "react-bootstrap/Image";
import RellaxWrapper from "react-rellax-wrapper";

class About extends Component {
  componentDidMount() {
    this.props.getFatLogs(this.props.username);
  }

  render() {
    return (
      <div>
        <Container fluid={true} style={{}}>
          <Row className="bg text-center">
            <Col style={{}}>
              <Row style={{ width: "40vw", margin: "auto" }}>
                <Col className="titleColumn">
                  {" "}
                  <h1 className="display-2  title">Fat Hacker</h1>
                  <div className="text-center titleh3">Reprogram Your Diet</div>
                  <Button
                    type="button"
                    className="btn  btn-primary btn-lg titlebtns mt-3 "
                    size="sm"
                  >
                    VIEW DEMO
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-primary btn-lg titlebtns mt-3"
                    size="sm"
                    onClick={() => {
                      this.props.openModal();
                    }}
                  >
                    GET STARTED
                  </Button>
                </Col>
              </Row>

              <Container bg-primary>
                <Row>
                  <Col className="lettuceColumn">
                    {" "}
                    <Image src={lettuceFeather4} className="lettuce" />
                  </Col>
                </Row>
              </Container>
              <Container bg-primary>
                <Row>
                  <Col className="phoneColumn">
                    {" "}
                    <Image src={phone1} className="phone" />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
        <Container
          style={{ width: "100vw", padding: "0" }}
          fluid={true}
          className="noMargin"
        >
          <Jumbotron
            className="col-sm-12 noMargin no padding jmbo"
            style={{ width: "100vw", marginBottom: "0" }}
          >
            <Row style={{ width: "100%" }} className="noMargin">
              <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                <p className="p1">
                  A fat consumption tracking app with advanced data analysis and
                  access to a food and grocery database with over 750,000 basic
                  foods .{" "}
                </p>
              </Col>

              <Button
                size="sm"
                className="ml-3 btnJumbo"
                xs={3}
                sm={3}
                md={3}
                lg={3}
                xl={3}
              >
                Learn More
              </Button>
            </Row>
          </Jumbotron>
        </Container>

        {/* Artichokes */}
        <Container fluid={true}>
          <Row className="artichokes text-center">
            <Col>
              {" "}
              <Container>
                <Row
                  className="align-items-center"
                  style={{
                    position: "absolute",
                    top: "30.5vh",
                    minWidth: "100vw",
                    left: "0"
                  }}
                >
                  <Col className="intuitiveColumn"> Intuitive.</Col>
                </Row>
              </Container>
              <Container>
                <Row className="intuitiveSubsRow">
                  <Col className="intuitiveSubTitles">
                    <div className="titleh3">National Food Database</div>
                    <div className="titleh3">Visual Data Analysis</div>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col className="phoneCalcColumn">
                    {" "}
                    <Image src={phoneCalc1} className="phoneCalc" />
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col className="pastaColumn">
                    {" "}
                    <Image src={pasta1} className="pasta" />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
        <Container
          style={{
            width: "100vw",
            padding: "0"
          }}
          fluid={true}
        >
          <Jumbotron
            className="col-sm-12 noMargin no padding jmbo2"
            style={{ width: "100vw" }}
          >
            <Row
              style={{ width: "100%", marginTop: "-3vh" }}
              className="noMargin"
            >
              <Col xs={12} sm={12} md={9} lg={9} xl={10}>
                <div className="optionTitle option">
                  An option for everyone...
                </div>
                <p className="p2" style={{ fontSize: "1.8vh" }}>
                  Although we would like to encourage you to fully eliminate
                  animal products from your diet, your number one health goal
                  should simply be to reduce fat consumption. For those
                  interested in making a drastic lifestyle change with the goal
                  of cutting out animal products altogether, we recommend you
                  follow John A. McDougall’s “Starch Solution”.{" "}
                </p>
              </Col>

              <Button
                target="_blank"
                href="https://www.drmcdougall.com/health/education/videos/free-electures/the-starch-solution/"
                size="sm"
                className="ml-3 btnJumbo2"
                xs={3}
                sm={3}
                md={3}
                lg={3}
                xl={2}
              >
                Learn More
              </Button>
            </Row>
          </Jumbotron>
        </Container>
        <Container fluid={true} style={{}} className="bg3 ">
          <Row className="expertsTitleRow">
            <Col className="expertsTitleColumn">
              <div className="titleFont"> Meet</div>

              <div className="titleFont">The</div>
              <div className="titleFont">Experts</div>
            </Col>
          </Row>

          <Row className="cardsRow">
            <Col className="cardColumn">
              <div className="fullCardBox1">
                <div className="cardTitleBox">
                  <div className="profileImageBox">
                    {" "}
                    <Image src={mcdougallCircle1} style={{ width: "100%" }} />
                  </div>
                  <span
                    style={{ position: "absolute", top: "12vh", left: "1vw" }}
                  >
                    Dr.{" "}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: "18vh",
                      left: "1vw"
                    }}
                  >
                    McDougall
                  </span>
                </div>

                <div className="jobBox1">American Physician</div>
                <div className="textBox1">
                  "A physician and nutrition expert who teaches better health
                  through vegetarian cuisine, John A. McDougall, MD has been
                  studying, writing, and speaking out about the effects of
                  nutrition on disease for over 50 years."
                  <Button
                    target="_blank"
                    href="https://www.drmcdougall.com/health/education/mailings/featured-articles/articles/fat-or-carbs-which-is-worse/"
                    size="sm"
                    className="ml-3 cardButton"
                  >
                    {" "}
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="fullCardBox1">
                {" "}
                <div className="cardTitleBox">
                  <div className="profileImageBox">
                    {" "}
                    <Image src={OrnishCircle1} style={{ width: "100%" }} />
                  </div>
                  <span
                    style={{ position: "absolute", top: "12vh", left: ".7vw" }}
                  >
                    Dr.{" "}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: "18vh",
                      left: ".7vw"
                    }}
                  >
                    Ornish
                  </span>
                </div>
                <div className="jobBox1">Physician / Researcher</div>
                <div className="textBox1">
                  "Ornish's low–fat, high–carbohydrate diet has been proven to
                  unstick some of the plaque build–up in arteries that causes a
                  heart attack. Several major health insurers cover the cost of
                  enrollment in his programs."
                  <Button
                    target="_blank"
                    href="https://www.ornish.com/undo-it/"
                    size="sm"
                    className="ml-3 cardButton"
                  >
                    {" "}
                    Learn More
                  </Button>
                </div>
              </div>
              <div
                className="fullCardBox1"
                style={{
                  minHeight: "57vh",
                  minWidth: "20vw"
                }}
              >
                {" "}
                <div className="cardTitleBox">
                  <div className="profileImageBox">
                    {" "}
                    <Image src={esselstynCircle1} style={{ width: "100%" }} />
                  </div>
                  <span
                    style={{ position: "absolute", top: "12vh", left: "1vw" }}
                  >
                    Dr.{" "}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      top: "18vh",
                      left: "1vw"
                    }}
                  >
                    Esselstyn
                  </span>
                </div>
                <div className="jobBox1">Physician / Researcher</div>
                <div className="textBox1">
                  "In a 4-year study of 198 participants seriously ill with
                  cardiovascular disease, of the 89% adherent to his low-fat /
                  high-carb program, 99.4% avoided further major cardiac
                  events."
                  <Button
                    target="_blank"
                    href="http://www.dresselstyn.com/site/"
                    size="sm"
                    className="ml-3 cardButton"
                  >
                    {" "}
                    Learn More
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Jumbotron className="jmbo3" style={{ width: "100vw" }}>
          <Row
            style={{ width: "100vw", marginTop: "-3vh" }}
            className="noMargin"
          >
            <Col xs={12} sm={12} md={9} lg={9} xl={10}>
              <div className="optionTitle option">Still not convinced?</div>
              <p className="p2" style={{ fontSize: "1.8vh" }}>
                Check out our list of common criticisms of low-fat, high-carb
                diets; and our fact-based rebuttals complete with sources.{" "}
              </p>
            </Col>

            <Button
              target="_blank"
              href="https://www.drmcdougall.com/health/education/videos/free-electures/the-starch-solution/"
              size="sm"
              className="ml-3 btnJumbo2"
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={2}
            >
              Learn More
            </Button>
          </Row>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fatLog: state.fatLog,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  open: state.register
});

export default connect(mapStateToProps, { getFatLogs, openModal })(About);
