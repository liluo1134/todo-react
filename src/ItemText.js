import React,{ Component } from 'react';
import './index.css';

class ItemText extends Component {
  constructor() {
    super();
    this.state = {
      itemText: '',
      flag: 0,
    };
    this.handleOver = this.handleOver.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAlterItem = this.handleAlterItem.bind(this);
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

  handleOver() {
    if(this.props.onOverItem) {
      this.props.onOverItem(this.props.indexs);
    }
  }

  handleDelete() {
    if(this.props.onDeleteItem) {
      this.props.onDeleteItem(this.props.indexs);
    }
  }

  handleAlterItem(event,index) {
    this.setState({
      itemText: ''
    });

    if(this.props.onAlterItem) {
      this.props.onAlterItem(event,this.props.indexs);
    }
  }

  handleShowTime() {
    var time = this.timeTrans(this.props.todoItem.date);
    if(this.props.todoItem.complete === 'F') {
      time = 'create in ' + time;
    }
    else if(this.props.todoItem.complete === 'T') {
      time = 'finish in ' + time;
    }
    else if(this.props.todoItem.complete === 'R') {
      time = 'alter in ' + time;
    }
    return time;
  }

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

  showOverState() {
    return this.props.todoItem.complete === 'T' ? 'overBtn2' : 'overBtn1';
  }

  showDel() {
    return this.state.flag === 0 ? 'delBtn1' : 'delBtn2';
  }

  showItemtext() {
    return this.props.todoItem.complete === 'T' ? 'itemText1' : 'itemText2';
  }

  render() {
    return (
      <tr>
        <td onMouseEnter={this.mouseEnter.bind(this)}
          onMouseLeave={this.mouseLeave.bind(this)}>
          <button className={this.showOverState()} id={this.props.indexs}
            onClick={this.handleOver} >
          </button>
          <input className={this.showItemtext()} id={this.props.indexs}
            value={this.props.todoItem.title} onChange={this.handleAlterItem} />
          <span className="dataSpan">{this.handleShowTime()}</span>
          <button className={this.showDel()} onClick={this.handleDelete} >
            <strong>×</strong>
          </button>
        </td>
      </tr>
    );
  }
}

export default ItemText;
