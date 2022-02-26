import React, { Component } from 'react';
import './index.css';
import {
  LikeOutlined,
  MessageOutlined
} from '@ant-design/icons';
import ReplyItem from '../ReplyItem'
import { getDuration } from '../../utils';

export default class CommentItem extends Component {
  
  imgError = () => {
    const { img } = this
    img.src = 'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/mirror-assets/168e0858b6ccfd57fe5~tplv-t2oaga2asx-no-mark:100:100:100:100.awebp'
  }

  render() {

    return (
      <div className="comment-item">
        <img className="comment-avatar" src={this.props.user_info.avatar_large}
        ref={(c) => { this.img = c }}
        onError={this.imgError}></img>
        <div className='comment-right'>
          {/* 评论头部 */}
          <div className='comment-header'>
            <div className='user-name'>{this.props.user_info.user_name}</div>
            <div className='user-title'>{this.props.user_info.description} @ {this.props.user_info.company}</div>
            <div className='time'>{getDuration(this.props.comment_info.ctime)}</div>
          </div>
          {/* 评论内容 */}
          <div className="content">{this.props.comment_info.comment_content}</div>
          {/* 评论底部 */}
          <div className='comment-footer'>
            <div className='item'>
              <LikeOutlined />
              <span hidden={this.props.comment_info.digg_count===0}> {this.props.comment_info.digg_count}</span>
            </div>
            <div className='item'>
              <MessageOutlined /> 
              <span hidden={this.props.comment_info.reply_count===0}> {this.props.comment_info.reply_count}</span>
            </div>
          </div>
          {/* 二级评论 */}
          <div className="second-comment">
            <div className='commentlist'
                ref={(c) => { this.dom = c }}
                onScrollCapture={this.handleOnScroll}>
                <ul>
                    {
                        this.props.reply_infos.map((item) => {
                            return (
                                <li key={item.reply_id}>
                                    <ReplyItem
                                        {...item}>
                                    </ReplyItem>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}
