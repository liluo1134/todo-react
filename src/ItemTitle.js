import React, { Component } from 'react';
import './index.css';
import AddItem from './AddItem.js';

class ItemTitle extends Component {
  constructor() {
    super();
    this.state = {
      filter: 'T',
      flag: 0,
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleShowItem = this.handleShowItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOver = this.handleOver.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAlterItem = this.handleAlterItem.bind(this);
    this.handleDelTitle = this.handleDelTitle.bind(this);
  }

  createItem(title) {
    var timestamp = Date.parse(new Date());
    var obj = {
      title: title,
      complete: 'F',
      date: timestamp,
    };
    return obj;
  }

  pad(num) {
    return Number(num) < 10 ? '0' + num : num;
  }

  timeTrans(date) {
    var data = new Date(date);
    var year = data.getFullYear();
    var month = this.pad(data.getMonth() + 1);
    var day = this.pad(data.getDate());
    return year + '-' + month + '-' + day;
  }

  setNewState(title) {
    this.setState({
      filter: title,
      flag: 0,
    });
  }

  handleShowItem() {
    if(this.props.onShow) {
      this.props.onShow(this.props.todoItem.title);
    }
  }

  handleAddItem() {
    this.setNewState(this.props.todoItem.title);
  }

  handleDelTitle() {
    if(this.props.onDelTitle) {
      this.props.onDelTitle(this.props.todoItem.title,this.props.index);
    }
  }

  //弹窗确定
  handleSubmit(value) {
    console.log(this.state.filter);
    var list = JSON.parse(localStorage.getItem(this.state.filter)) || [];
    list.push(this.createItem(value.itemText));
    localStorage.setItem(this.state.filter,JSON.stringify(list));
    this.handleClose();
  }

  //弹窗的取消关闭
  handleClose() {
    var title = 'T';
    this.setNewState(title);
  }


  handleOver() {
    if(this.props.onOverItem) {
      this.props.onOverItem(this.props.index);
    }
  }

  handleDelete() {
    if(this.props.onDeleteItem) {
      this.props.onDeleteItem(this.props.indexs);
    }
  }

  handleAlterItem() {
    if(this.props.onAlterItem) {
      this.props.onAlterItem(this.props.index);
    }
  }

  handleChange() {}

  mouseEnter() {
    this.setState({
      flag: 1,
    });
  }

  mouseLeave() {
    this.setState({
      flag: 0,
    });
  }

  showArrowBtn() {
    return this.props.Show === this.props.todoItem.title ? 'arrowBtn1' : 'arrowBtn';
  }

  showDel() {
    return this.state.flag === 0 ? 'delTitleBtn1' : 'delTitleBtn2';
  }

  showAddStrong() {
    return this.state.flag === 0 ? 'addStrong1' : 'addStrong2';
  }

  render() {
    var list = JSON.parse(localStorage.getItem('list')) || [];
    var div = '';

    if(this.state.filter !== 'T') {
      div =
        <AddItem
          handleAddItem={this.handleAddItem}
          index={this.props.index}
          title={list[this.props.index].title}
          onClose={this.handleClose}
          onSubmit={this.handleSubmit}
        />;
    }

    return (
      <div>
        <li className="liItem" id={this.props.index} onMouseEnter={this.mouseEnter.bind(this)}
         onMouseLeave={this.mouseLeave.bind(this)}>
          <button className={this.showArrowBtn()} onClick={this.handleShowItem}>
          </button>
          <input className="itemInp" type="text" value={this.props.todoItem.title} onChange={this.handleChange}/>
          <button className="addBtn" onClick={this.handleAddItem}>
            <strong className={this.showAddStrong()}>＋</strong>
          </button>
          <button className={this.showDel()} onClick={this.handleDelTitle}>
            <strong>×</strong>
          </button>
        </li>
        {div}
      </div>
    );
  }
}

export default ItemTitle;
