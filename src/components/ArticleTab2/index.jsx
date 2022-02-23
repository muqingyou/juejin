import React, { Component } from 'react';
import './index.css';
import PubSub from 'pubsub-js';

export default class ArticleTab2 extends Component {
  state={
    activeNum:0,
  }

  handleClick = (e) =>{
    this.setState({activeNum:e.target.id})
    PubSub.publish('ArticleTab2 click',e.target.id);
  }

  static getDerivedStateFromProps(props,state){
    state.activeNum = props.tab2
    return state
  }

  render() {
    console.log('tab2 props-----',this.props)

    var children=[];
    if(!this.props.categories){
    }
    else if('children' in this.props.categories){
      children = this.props.categories.children
    }

    return (
      <div className='articlebar2'>
        {
          children.map((item)=>{
            return (
                <button key={item.category_id} className={(this.state.activeNum==item.category_id?'active':'')} 
                  onClick={this.handleClick} id={item.category_id}>
                    {item.category_name}
                </button>
            )
        })
        }
      </div>
    )
  }
}
