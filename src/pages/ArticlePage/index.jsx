import React, { Component } from 'react';
import './index.css';

export default class ArticlePage extends Component {
  componentDidMount(){
    
  }

  render() {
    return (
        <div className="article-page">
          <div className="article">
            <div className="author-bar">
              <div className="avatar"></div>
              <div className="name"></div>

            </div>
            <div className="article-body">

            </div>
          </div>
          <div className="comment">

          </div>
        </div>
    )
  }
}
