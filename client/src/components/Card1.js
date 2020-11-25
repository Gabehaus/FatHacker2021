import React, { Component } from "react"
import { Button } from "reactstrap"
import Image from "react-bootstrap/Image"

export default class Card1 extends Component {
  render() {
    return (
      <div className='fullCardBox1'>
        <div className='cardTitleBox'>
          <div className='profileImageBox'>
            {" "}
            <Image src={this.props.image} style={{ width: "100%" }} />
          </div>
        </div>

        <div className='jobBox1'>
          <div className='name'>{this.props.name}</div>
        </div>
        <div className='textBox1'>
          <div className='actualText'>{this.props.summary}</div>
          <Button
            href={this.props.buttonSource}
            size='md'
            className='cardButton'
          >
            {" "}
            LINK
          </Button>
        </div>
      </div>
    )
  }
}
