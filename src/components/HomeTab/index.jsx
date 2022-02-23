import React, { Component } from 'react';
import './index.css';
import PubSub from 'pubsub-js';

export default class HomeTab extends Component {
  state = {
    active: 'hot',
  }

  handleClick = (e) =>{
    this.setState({active:e.target.id})
    PubSub.publish('HomeTab click',e.target.id);
  }

  render() {
    return (
      <div className='homebar'>
        <div className={'item' + ' ' + (this.state.active === 'hot' ? 'active' : '')}
                  onClick={this.handleClick} id='hot'>热门</div>
        <div className={'item' + ' ' + (this.state.active === 'new' ? 'active' : '')}
                  onClick={this.handleClick} id='new'>最新</div>
        <div className={'item' + ' ' + (this.state.active === 'history' ? 'active' : '')}
                  onClick={this.handleClick} id='history'>历史</div>
      </div>
    )
  }
}
