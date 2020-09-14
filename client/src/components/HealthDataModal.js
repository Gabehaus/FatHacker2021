import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";

import { connect } from "react-redux";
import {
  addHealthData,
  editHealthData,
  getHealthData
} from "../actions/healthDataActions";
import { loadUser } from "../actions/authActions";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

class HealthDataModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      name: "",
      date: new Date(),
      msg: "",
      sex: "Male",
      age: "35",
      weight: "145",
      height: "6'5''/ 195.5cm",
      goal: "Maintain weight",
      activityLevel: "Very heavy exercise"
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getHealthData(this.props.username);
  }

  componentDidUpdate(prevProps) {
    const { error, healthData } = this.props;

    if (healthData.healthData.age !== prevProps.healthData.healthData.age) {
      this.props.getHealthData(this.props.username);
    }

    if (
      healthData.loading !== prevProps.healthData.loading &&
      healthData.healthData.age
    ) {
      this.setState({
        weight: healthData.healthData.weight,
        height: healthData.healthData.height,
        age: healthData.healthData.age,
        sex: healthData.healthData.sex,
        goal: healthData.healthData.goal,
        activityLevel: healthData.healthData.activityLevel
      });
    }

    if (error !== prevProps.error) {
      //Check for fatLog error
      if (error.id === "ADD_HEALTHDATA_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      msg: null
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeDate = date => {
    this.setState({
      age: date
    });
  };

  onSubmit(e) {
    const { healthData } = this.props;
    e.preventDefault();
    if (!healthData.healthData.age) {
      const newHealthData = {
        username: this.props.username,
        sex: this.state.sex,
        age: this.state.age,
        height: this.state.height,
        weight: this.state.weight,
        goal: this.state.goal,
        activityLevel: this.state.activityLevel
      };

      // Add item via addItem action
      this.props.addHealthData(newHealthData);
      this.props.loadUser();
      this.props.getHealthData(this.props.username);

      // Close modal
      this.toggle();
    } else {
      e.preventDefault();

      const newHealthData = {
        username: this.props.username,
        sex: this.state.sex,
        age: this.state.age,
        height: this.state.height,
        weight: this.state.weight,
        goal: this.state.goal,
        activityLevel: this.state.activityLevel
      };

      // Add item via addItem action
      this.props.editHealthData(newHealthData, this.props.username);
      this.props.loadUser();
      this.props.getHealthData(this.props.username);
      // Close modal
      this.toggle();
    }
  }

  render() {
    const { healthData } = this.props;
    return (
      <div>
        {!healthData.healthData.age ? (
          <Button color="dark" className="dataButton" onClick={this.toggle}>
            ENTER HEALTH DATA
          </Button>
        ) : (
          <Button color="dark" className="dataButton" onClick={this.toggle}>
            EDIT HEALTH DATA
          </Button>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.username}</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit.bind(this)}>
              {/*
              <FormGroup>
                <Label>Age </Label>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />  
              </FormGroup>*/}
              <FormGroup>
                <Label for="healthData">Date Of Birth</Label>
                <Input
                  type="date"
                  name="age"
                  autocomplete="off"
                  defaultValue={healthData.healthData.age}
                  id="age"
                  placeholder="date placeholder"
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="healthData">Sex</Label>
                <Input
                  type="select"
                  name="sex"
                  autocomplete="off"
                  defaultValue={healthData.healthData.sex}
                  id="sex"
                  onChange={this.onChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="healthData">Height</Label>
                <Input
                  type="select"
                  name="height"
                  autocomplete="off"
                  defaultValue={healthData.healthData.height}
                  id="height"
                  onChange={this.onChange}
                >
                  <option>6'5''/ 195.5cm</option>
                  <option>6'4''/ 193cm</option>
                  <option>6'3''/ 190.5cm</option>
                  <option>6'2''/ 188cm</option>
                  <option>6'1''/ 185.5cm</option>
                  <option>6'0''/ 183cm</option>
                  <option>5'11''/ 180.5cm</option>
                  <option>5'10''/ 178cm</option>
                  <option>5'9''/ 175cm</option>
                  <option>5'8''/ 173cm</option>
                  <option>5'7''/ 170cm</option>
                  <option>5'6''/ 167.5cm</option>
                  <option>5'5''/ 165cm</option>
                  <option>5'4''/ 162.5cm</option>
                  <option>5'3''/ 160cm</option>
                  <option>5'2''/ 157.5cm</option>
                  <option>5'1''/ 155cm</option>
                  <option>5'0''/ 152.5cm</option>
                  <option>4'11''/ 150cm</option>
                  <option>4'10''/ 147cm</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="healthData">Weight (lbs)</Label>

                <Input
                  placeholder="Weight"
                  type="number"
                  step="1"
                  min={70}
                  max={300}
                  name="weight"
                  defaultValue={healthData.healthData.weight}
                  id="weight"
                  autocomplete="off"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="healthData">Goal</Label>
                <Input
                  type="select"
                  name="goal"
                  defaultValue={healthData.healthData.goal}
                  id="goal"
                  onChange={this.onChange}
                >
                  <option>Maintain weight</option>
                  <option>Lose 10 lbs</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="healthData">Activity Level</Label>
                <Input
                  type="select"
                  name="activityLevel"
                  defaultValue={healthData.healthData.activityLevel}
                  id="activityLevel"
                  onChange={this.onChange}
                >
                  <option>Very heavy exercise</option>
                  <option>Heavy exercise</option>
                  <option>Moderate exercise</option>
                  <option>Light exercise</option>
                  <option>Little to no exercise</option>
                </Input>
                {!this.props.healthData.sex ||
                !this.props.healthData.age ||
                !this.props.healthData.height ||
                !this.props.healthData.weight ||
                !this.props.healthData.goal ||
                !this.props.healthData.activityLevel ? (
                  <Button color="dark" style={{ marginTop: "2rem" }} block>
                    Save Data
                  </Button>
                ) : (
                  <Button
                    color="dark"
                    onClick={() => this.props.editHealthData()}
                    style={{ marginTop: "2rem" }}
                    block
                  >
                    Update Data
                  </Button>
                )}
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  healthData: state.healthData,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error
});

export default connect(mapStateToProps, {
  addHealthData,
  editHealthData,
  getHealthData,
  loadUser
})(HealthDataModal);
