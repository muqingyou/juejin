import React, { Component } from 'react';
import ArticleTab2 from '../../components/ArticleTab2';
import './index.css';
import PubSub from 'pubsub-js';


export default class ArticleTab1 extends Component {
  state = {
    activeNum: 0,
    tab2: 0,
  }

  componentDidMount() {
    //订阅tab2点击分类id
    this.tab2token = PubSub.subscribe('ArticleTab2 click', (_, data) => {
      console.log('Tab1订阅到ArticleTab2 click-------', data)
      this.setState({
        tab2: Number(data)
      })
    })

    //订阅hometab点击分类id
    this.hometoken = PubSub.subscribe('HomeTab click', (_, data) => {
      console.log('Tab1订阅到HomeTab click-------', data)
      if(data==='history'){
        this.setState({
          activeNum:0,
          tab2: 0
        })
      }
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.tab2token)
    PubSub.unsubscribe(this.hometoken)
  }

  handleClick = (e) => {
    console.log('ArticleTab1 click------', e.target.id);
    this.setState({
      activeNum: Number(e.target.id),
      tab2: 0
    });

    PubSub.publish('ArticleTab1 click', Number(e.target.id));
  }

  render() {
    return (
      <div>
        <div className='articlebar1'>
          {
            this.props.categories.map((item) => {
              return (
                <div key={item.category_id} className={'item' + ' ' + (this.state.activeNum == item.category_id ? 'active' : '')}
                  onClick={this.handleClick} id={item.category_id}>
                  {item.category_name}
                </div>
              )
            })
          }
        </div>
        <ArticleTab2 categories={this.props.categories[this.state.activeNum]}
          tab2={this.state.tab2}></ArticleTab2>
      </div>
    )
  }
}
