import React, { Component } from 'react';
import './index.css';
import PubSub from 'pubsub-js';

export default class HomeTab extends Component {
  state = {
    active: 'hot',
  }

  componentDidMount(){
    //订阅tab1点击
    this.tab1token = PubSub.subscribe('ArticleTab1 click', (_, data) => {
      console.log('hometab订阅到ArticleTab1 click', data)
      if(this.state.active==='history'){
        this.setState({active:'hot'})
      }
    })

    //订阅tab2点击
    this.tab2token = PubSub.subscribe('ArticleTab2 click', (_, data) => {
      console.log('hometab订阅到ArticleTab2 click', data)
      if(this.state.active==='history'){
        this.setState({active:'hot'})
      }
    })
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.tab1token)
    PubSub.unsubscribe(this.tab2token)
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
