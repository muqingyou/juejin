import React, { Component } from 'react';
import './index.css';
import {
  EyeOutlined,
  LikeOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { getDuration } from '../../utils';

export default class ArticleItem extends Component {
  render() {

    return (
      <div className="article">
        <div className='article-header'>
          <div className='item'>{this.props.author_user_info.user_name}</div>
          <div className='item'>{getDuration(this.props.article_info.ctime)}</div>
          <div className='item'>{this.props.category_info.first_category_name} · {this.props.category_info.second_category_name}</div>
        </div>
        <div className="title">{this.props.article_info.title}</div>
        <div className="content">{this.props.article_info.brief_content}</div>
        <div className='article-footer'>
          <div className='item'><EyeOutlined /> {this.props.article_info.hot_index}</div>
          <div className='item'><LikeOutlined /> {this.props.article_info.digg_count}</div>
          <div className='item'><MessageOutlined /> {this.props.article_info.comment_count}</div>
        </div>
      </div>
    )
  }
}
