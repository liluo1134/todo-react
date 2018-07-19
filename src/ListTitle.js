import React, { Component } from 'react';
import './index.css';
import ItemTitle from './ItemTitle.js';
import ItemText from './ItemText.js';
import Footer from './Footer.js';

class ListTitle extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      filter: 'all',
    };
    this.handleShowItem = this.handleShowItem.bind(this);
    this.handleOver = this.handleOver.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAlterItem = this.handleAlterItem.bind(this);
    this.handleDelTitle = this.handleDelTitle.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.handleClearItem = this.handleClearItem.bind(this);
  }

  changeFilter(filters) {
    this.setState({
      filter: filters,
    });
  }

  handleShowItem(title) {
    var newTitle = '';
    if(this.state.isShow === title){
      newTitle = false;
    }
    else {
      newTitle = title;
    }
    this.setState({
      isShow: newTitle,
    });
  }

  handleOver(index) {
    var item = JSON.parse(localStorage.getItem(this.state.isShow)) || [];
    item[index].date = Date.parse(new Date());
    if(item[index].complete === 'F' || item[index].complete === 'R') {
      item[index].complete = 'T';
    }
    else {
      item[index].complete = 'R';
    }
    localStorage.setItem(this.state.isShow,JSON.stringify(item));
    this.setState({ isShow: this.state.isShow, });
  }

  handleDelete(index) {
    var item = JSON.parse(localStorage.getItem(this.state.isShow)) || [];
    item.splice(index,1);
    localStorage.setItem(this.state.isShow,JSON.stringify(item));
    this.setState({ isShow: this.state.isShow, });
  }

  handleAlterItem(event,index) {
    var item = JSON.parse(localStorage.getItem(this.state.isShow)) || [];
    item[index].title = event.target.value;
    item[index].date = Date.parse(new Date());
    item[index].complete = 'R';
    localStorage.setItem(this.state.isShow,JSON.stringify(item));
    this.setState({ isShow: this.state.isShow, });
  }

  handleDelTitle(item,index) {
    var itemList = JSON.parse(localStorage.getItem('list')) || [];
    itemList.splice(index,1);
    localStorage.setItem('list',JSON.stringify(itemList));
    if(localStorage.getItem(item)) {
      localStorage.removeItem(item);
    }
    this.setState({ isShow: this.state.isShow });
  }

  handleClearItem() {
    var item = JSON.parse(localStorage.getItem(this.state.isShow)) || [];
    for(var i=0;i<item.length;) {
      if(item[i].complete === 'T') {
        item.splice(i,1);
        continue;
      }
      i++;
    }
    localStorage.setItem(this.state.isShow,JSON.stringify(item));
    this.setState({ isShow: this.state.isShow, });
  }

  render() {
    var list = JSON.parse(localStorage.getItem('list')) || [];
    var itemList = JSON.parse(localStorage.getItem(this.state.isShow)) || [];
    var text = '';
    const { filter } = this.state;
    var div =
      <table>
        <tbody>
          {itemList.map((item,j) => {
            if (filter === 'all' ||
              (filter === 'active' &&
              (item.complete === 'F' || item.complete === 'R')) ||
              (filter === 'complete' && item.complete === 'T')
              ) {
                return (
                  <ItemText
                    todoItem={item}
                    indexs={j}
                    key={item.title}
                    onOverItem={this.handleOver}
                    onDeleteItem={this.handleDelete}
                    onAlterItem={this.handleAlterItem}
                    onChange={this.handleAlterItem}
                  />
                );}
          })}
        </tbody>
      </table>;

      var footer = '';
      if(this.state.isShow !== false){
        footer =
          <Footer
            filter={this.state.filter}
            changeFilter={this.changeFilter}
            itemList={this.state.isShow}
            handleClearItem={this.handleClearItem}
          />;
      }

    return (
      <div>
        <ul id="ul">
          {list.map((comment,i) => {
            if(list[i].title === this.state.isShow) { text = div;}
            else { text = ''; }
            return (
              <div>
                <ItemTitle
                  todoItem={comment}
                  key={i}
                  index={i}
                  onShow={this.handleShowItem}
                  Show={this.state.isShow}
                  onDelTitle={this.handleDelTitle}
                />
                {text}
              </div>
            )
          })}
        </ul>
        {footer}
      </div>
    );
  }
}

export default ListTitle;
