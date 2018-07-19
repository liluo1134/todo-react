import React, { Component } from 'react';
import './index.css';
import ListTitle from './ListTitle.js';

class MainItem extends Component {
  constructor() {
    super();
    this.state = {
      itemTitle: '',
    };
    this.handleItemtextChange = this.handleItemtextChange.bind(this);
    this.enterPress = this.enterPress.bind(this);
    this.onKeyPress = this.enterPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createItem(title) {
    var obj = {
      title: title,
    };
    return obj;
  }

  handleItemtextChange(event) {
    this.setState({
      itemTitle: event.target.value,
    });
  }

  handleSubmit() {
    var itemList = JSON.parse(localStorage.getItem('list')) || [];
    var obj = this.createItem(this.state.itemTitle);
    itemList.push(obj);
    localStorage.setItem('list',JSON.stringify(itemList));
    this.setState({
      itemTitle: '',
    });
  }

  enterPress(e) {
    if (e.keyCode === 13) {
        this.handleSubmit();
    }
  }

  render() {
    return (
      <div className="wrapper">
        <span id="todo">todo</span>
        <input id="titleInp" type="text" placeholder="what needs to be done?"
          value={this.state.itemTitle} onChange={this.handleItemtextChange}
          onKeyDown={this.enterPress} onKeyPress={this.enterPress}
        />
        <button type="button" id="OKBtn" onClick={this.handleSubmit}>
          OK
        </button>
        <ListTitle />
      </div>
    );
  }
}

export default MainItem;
