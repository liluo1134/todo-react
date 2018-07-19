import React,{ Component } from 'react';
import './index.css';

class Footer extends Component {
  constructor() {
    super();
    this.handleClearItem = this.handleClearItem.bind(this);
  }

  handleClearItem() {
    if(this.props.handleClearItem) {
      this.props.handleClearItem();
    }
  }

  showFilter(filter) {
    return this.props.filter === filter ? 'onBtn' : 'unBtn';
  }

  showClearCompleteBtn() {
    var flag = 0;
    var itemList = JSON.parse(localStorage.getItem(this.props.itemList)) || [];
    for(var i=0;i<itemList.length;i++) {
      if(itemList[i].complete === 'T') {
        flag = 1;
        break;
      }
    }
    return flag === 1 ? 'onShow' : 'unShow';
  }

  render() {
    var list = JSON.parse(localStorage.getItem(this.props.itemList)) || [];
    return (
      <div id="footer">
        <span id="showNum">{list.length} Items.</span>
        <button type="button" onClick={() => this.props.changeFilter('all')} className={this.showFilter('all')}>
          All
        </button>
        <button type="button" onClick={() => this.props.changeFilter('active')} className={this.showFilter('active')}>
          Active
        </button>
        <button type="button" onClick={() => this.props.changeFilter('complete')} className={this.showFilter('complete')}>
          Complete
        </button>
        <button type="button" className={this.showClearCompleteBtn()} onClick={this.handleClearItem}>
          ClearComplete
        </button>
      </div>
    );
  }
}

export default Footer;
