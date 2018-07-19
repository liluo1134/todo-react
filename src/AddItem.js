import React, { Component } from 'react';
import './add.css';

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      itemText: '',
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enterPress = this.enterPress.bind(this);
    this.onKeyPress = this.enterPress.bind(this);
  }

  handleClose() {
    if(this.props.onClose) {
      this.props.onClose();
    }
  }

  handleChange(event) {
    this.setState({
      itemText: event.target.value
    });
  }

  handleSubmit() {
    if(this.props.onSubmit) {
      const { itemText } = this.state;
      this.props.onSubmit({ itemText })
    }
    this.setState({ itemText: ''});
  }

  enterPress(e) {
    if (e.keyCode === 13) {
        this.handleSubmit();
    }
  }

  render() {
    return (
      <div>
        <div className="m-mask"></div>
        <div className="m-dialog">
          <div className="md-dialog">
            <div className="header">
              <span className="title">{this.props.title}</span>
              <button className="closeBtn" onClick={this.handleClose}>
                <strong>×</strong>
              </button>
            </div>
            <hr/>
            <div className="body">
              <input className="itemInput" type="text" placeholder="Please input task"
                onChange={this.handleChange} onKeyDown={this.enterPress}
                onKeyPress={this.enterPress}/>
            </div>
            <div className="footer">
              <button className="submitBtn" onClick={this.handleSubmit}>
                确定
              </button>
              <button className="cancelBtn" onClick={this.handleClose}>
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddItem;
