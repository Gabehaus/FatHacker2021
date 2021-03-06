import React, { Component } from "react"
import { connect } from "react-redux"
import { getFatLogs } from "../actions/fatLogActions"
import { openModal } from "../actions/regActions"
import lettuceFeather4 from "../images/lettuceFeather4.png"
import phone1 from "../images/phone1.png"
import pasta1 from "../images/pasta1.png"
import phoneCalc1 from "../images/phoneCalc1.png"
import mcdougallCircle1 from "../images/mcdougallCircle1.png"
import OrnishCircle1 from "../images/OrnishCircle1.png"
import esselstynCircle1 from "../images/esselstynCircle1.png"
import Card1 from "./Card1"
import Footer from "./Footer"
import { Jumbotron, Container, Row, Col } from "reactstrap"
import ImageB from "react-bootstrap/Image"
import Aos from "aos"
import "aos/dist/aos.css"
import { push } from "connected-react-router"
import store from "../store"

class About extends Component {
  state = {
    backgrounds: [
      lettuceFeather4,
      phone1,
      phoneCalc1,
      pasta1,
      mcdougallCircle1,
      OrnishCircle1,
      esselstynCircle1
    ],
    bgsPreloaded: []
  }

  componentDidMount() {
    //this.props.getFatLogs(this.props.username);

    Aos.init({ duration: 2000, disable: "phone" }) // initialize animate on scroll

    this.state.backgrounds.map(elem => {
      this.state.bgsPreloaded.push((new Image().src = elem))
    })
  }

  render() {
    return (
      <div>
        <Container fluid={true} style={{}}>
          <Row className='bg text-center'>
            <Col style={{}}>
              <Row style={{ width: "40vw", margin: "auto" }}>
                <Col className='titleColumn'>
                  {" "}
                  <h1 className='display-2  title title1' data-aos='zoom-in'>
                    Fat Hacker
                  </h1>
                  <div className='text-center titleh3' data-aos='zoom-in'>
                    Reprogram Your Diet
                  </div>
                  <button
                    id='demo'
                    type='button'
                    className='titlebtns'
                    data-aos='zoom-in'
                    onClick={() => {
                      store.dispatch(push("/demo"))
                    }}
                  >
                    VIEW DEMO
                  </button>
                  <button
                    id='register'
                    data-aos='zoom-in'
                    type='button'
                    className='titlebtns'
                    onClick={() => {
                      this.props.openModal()
                    }}
                  >
                    REGISTER
                  </button>
                </Col>
              </Row>

              <Container>
                <Row>
                  <Col className='lettuceColumn' data-aos='zoom-in'>
                    {" "}
                    <ImageB
                      src={this.state.bgsPreloaded[0]}
                      className='lettuce'
                    />
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col className='phoneColumn' data-aos='zoom-in'>
                    {" "}
                    <ImageB
                      src={this.state.bgsPreloaded[1]}
                      className='phone'
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
        <Container
          style={{ width: "100vw", padding: "0" }}
          fluid={true}
          className='noMargin'
        >
          <div
            className='col-sm-12 noMargin no padding jmbo'
            style={{
              width: "100vw",
              marginBottom: "0"
            }}
          >
            <div className='descriptionBox'>
              <p
                className='p1'
                data-aos='fade-right'
                data-aos-anchor-placement='.title'
              >
                A fat consumption tracking app with advanced data analysis and
                access to a food and grocery database with over 750,000 basic
                foods .{" "}
              </p>
            </div>
          </div>
        </Container>

        {/* Artichokes */}
        <Container
          fluid={true}
          style={{ width: "100vw", background: "rgba(0, 0, 0, 0.9);" }}
        >
          <Row className='artichokes text-center'>
            <Col>
              {" "}
              <Container>
                <Row
                  className='align-items-center'
                  style={{
                    position: "absolute",
                    top: "30.5vh",
                    minWidth: "100vw",
                    left: "0"
                  }}
                >
                  <Col className='intuitiveColumn' data-aos='fade-up'>
                    {" "}
                    Intuitive.
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row className='intuitiveSubsRow'>
                  <Col className='intuitiveSubTitles'>
                    <div className='titleh3b' data-aos='fade-up'>
                      National Food Database
                    </div>
                    <div className='titleh3b' data-aos='fade-up'>
                      Visual Data Analysis
                    </div>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col className='phoneCalcColumn'>
                    {" "}
                    <ImageB
                      src={this.state.bgsPreloaded[2]}
                      className='phoneCalc'
                      data-aos='fade-right'
                    />
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col className='pastaColumn'>
                    {" "}
                    <ImageB
                      src={this.state.bgsPreloaded[3]}
                      className='pasta'
                      data-aos='fade-left'
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>

        <div className='jmbo2' style={{ width: "100vw" }}>
          <div className='jmboTextBox'>
            <div
              className='optionTitle option'
              data-aos='fade-right'
              data-aos-anchor-placement='.titleh3'
            >
              An option for everyone...
            </div>
            <p
              className='p2'
              style={{ fontSize: "1.8vh" }}
              data-aos='fade-right'
              data-aos-anchor-placement='.titleh3'
            >
              Although we would like to encourage you to fully eliminate animal
              products from your diet, your number one health goal should simply
              be to reduce fat consumption. For those interested in making a
              drastic lifestyle change with the goal of cutting out animal
              products altogether, we recommend you follow John A. McDougall???s
              ???Starch Solution???.{" "}
            </p>
          </div>
          <div className='btnJumboBox2'>
            <button
              href='https://www.drmcdougall.com/health/education/videos/free-electures/the-starch-solution/'
              className='ml-3 btnJumbo2'
              data-aos='fade-left'
              data-aos-anchor-placement='.titleh3'
            >
              LEARN MORE
            </button>
          </div>
        </div>

        <Container fluid={true} style={{ padding: "0" }} className='bg3 '>
          <Row className='expertsTitleRow'>
            <Col className='expertsTitleColumn'>
              <div className='titleFont' data-aos='fade-right'>
                {" "}
                Meet
              </div>

              <div className='titleFont' data-aos='fade-right'>
                The
              </div>
              <div className='titleFont b' data-aos='fade-right'>
                Experts
              </div>
            </Col>
          </Row>

          <Row className='cardsRow' data-aos='fade-up'>
            <Col className='cardColumn'>
              <Card1
                image={this.state.bgsPreloaded[4]}
                name='Dr. McDougall'
                summary='A physician and nutrition expert who teaches better health
                  through vegetarian cuisine, John A. McDougall, MD has been
                  studying, writing, and speaking out about the effects of
                  nutrition on disease for over 50 years.'
                buttonSource='https://www.drmcdougall.com/health/education/mailings/featured-articles/articles/fat-or-carbs-which-is-worse/'
              ></Card1>
              <Card1
                image={this.state.bgsPreloaded[5]}
                name='Dr. Ornish'
                summary="Ornish's low???fat, high???carbohydrate diet has been proven to
                unstick some of the plaque build???up in arteries that causes a
                heart attack. Several major health insurers cover the cost of
                enrollment in his programs."
                buttonSource='https://www.ornish.com/undo-it/'
              ></Card1>
              <Card1
                image={this.state.bgsPreloaded[6]}
                name='Dr. Esselstyn'
                summary='In a 4-year study of 198 participants seriously ill with
                cardiovascular disease, of the 89% adherent to his low-fat /
                high-carb program, 99.4% avoided further major cardiac
                events.'
                buttonSource='http://www.dresselstyn.com/site/'
              ></Card1>
            </Col>
          </Row>
        </Container>

        <div className='jmbo3' style={{ width: "100vw" }} id='qNa'>
          <div className='jmboTextBox'>
            <div
              className='optionTitle option'
              data-aos='fade-right'
              data-aos-anchor-placement='.titleFont'
            >
              Still not convinced?
            </div>
            <p
              className='p2'
              style={{ fontSize: "1.8vh" }}
              data-aos='fade-right'
              data-aos-anchor-placement='.titleFont'
            >
              Check out our list of common criticisms of low-fat high-carb
              diets, and our fact-based rebuttals complete with sources.{" "}
            </p>
          </div>
          <div className='btnJumboBox2'>
            <button
              target='_blank'
              href='https://www.drmcdougall.com/health/education/videos/free-electures/the-starch-solution/'
              size='sm'
              className='btnJumbo3'
              data-aos='fade-left'
              data-aos-anchor-placement='.titleFont'
            >
              LEARN MORE
            </button>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fatLog: state.fatLog,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  open: state.register
})

export default connect(mapStateToProps, { getFatLogs, openModal })(About)
