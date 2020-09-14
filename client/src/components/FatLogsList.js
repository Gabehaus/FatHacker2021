import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getFatLogs, deleteFatLog } from "../actions/fatLogActions";
import { loadUser } from "../actions/authActions";
import PropTypes from "prop-types";
import moment from "moment";
import "../App.css";

class FatLogsList extends Component {
  static propTypes = {
    getFatLogs: PropTypes.func.isRequired,
    fatLog: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getFatLogs(this.props.username);
  }

  /*putUserIntoState = () => {
    let promise = new Promise(resolve => resolve(store.dispatch(loadUser())));
    promise.then(this.props.getFatLogs(store.getState().auth.user));
  };*/

  onDeleteClick = (id, user) => {
    this.props.deleteFatLog(id, user);
  };

  render() {
    const { fatLogs } = this.props.fatLog;

    return (
      <div>
        {fatLogs ? (
          fatLogs.length >= 1 ? (
            <Container className="logList">
              <ListGroup>
                <TransitionGroup className="fatLogs-list">
                  {fatLogs.map(
                    ({
                      _id,
                      username,
                      food,
                      unit,
                      quantity,
                      fat,
                      date,
                      meal
                    }) => (
                      <CSSTransition
                        key={_id}
                        timeout={500}
                        classNames="fade"
                        style={{
                          backgroundColor: "rgba(8, 8, 8)",
                          border: "solid 1px",
                          borderColor: "#00d486",
                          marginBottom: "10px",
                          color: "black"
                        }}
                      >
                        <ListGroupItem>
                          {this.props.isAuthenticated ? (
                            <Button
                              className="remove-btn"
                              size="sm"
                              onClick={this.onDeleteClick.bind(
                                this,
                                _id,
                                username
                              )}
                            >
                              &times;
                            </Button>
                          ) : null}

                          <Form>
                            <FormGroup>
                              <Label for="fatLog" style={{ color: "#99FFCC" }}>
                                Username
                              </Label>
                              <Input
                                type="text"
                                value={username}
                                readOnly
                                className="input"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="fatLog" style={{ color: "#99FFCC" }}>
                                Food
                              </Label>
                              <Input
                                type="text"
                                value={food}
                                readOnly
                                className="input"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="fatLog" style={{ color: "#99FFCC" }}>
                                Unit
                              </Label>
                              <Input
                                type="text"
                                value={unit}
                                readOnly
                                className="input"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="fatLog" style={{ color: "#99FFCC" }}>
                                Quantity
                              </Label>
                              <Input
                                type="text"
                                value={quantity}
                                readOnly
                                className="input"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="fatLog" style={{ color: "#99FFCC" }}>
                                Fat Content In Grams
                              </Label>
                              <Input
                                type="number"
                                value={fat}
                                readOnly
                                className="input"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="fatLog" style={{ color: "#99FFCC" }}>
                                Date
                              </Label>
                              <Input
                                value={moment(date).format("LLLL")}
                                readOnly
                                className="input"
                              ></Input>
                            </FormGroup>
                            <FormGroup>
                              <Label for="fatLog" style={{ color: "#99FFCC" }}>
                                Meal
                              </Label>
                              <Input
                                type="text"
                                value={meal}
                                readOnly
                                className="input"
                              />
                            </FormGroup>
                          </Form>
                        </ListGroupItem>
                      </CSSTransition>
                    )
                  )}
                </TransitionGroup>
              </ListGroup>
            </Container>
          ) : (
            <div className="addLogNotice">
              Add a fat consumption log to get started!
            </div>
          )
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fatLog: state.fatLog,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getFatLogs,
  deleteFatLog,
  loadUser
})(FatLogsList);
