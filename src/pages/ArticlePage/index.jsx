import React, { Component } from 'react';
import { getArticleById,getCommentsByArticleId } from '../../fake-api'
import './index.css';
import { getDate } from '../../utils';
import CommentItem from '../../components/CommentItem';

export default class ArticlePage extends Component {
  state = {
    author_user_info: {},
    article_info: {},
    offset:0,
    id:"",
    comments:[]
  }
  componentDidMount() {
    var that = this
    const { search } = this.props.location
    var searchParams = new URLSearchParams(search);
    var id = searchParams.get("id")
    this.setState({
      id:id
    })

    getArticleById(id).then(
      response => {
        console.log(response.data.article)
        that.setState(response.data.article)
        //插入html
        var articleBody = document.getElementsByClassName("article-body")[0];
        articleBody.innerHTML = response.data.article.article_content;
      },
      error => {}
    )

    getCommentsByArticleId(id).then(
      response => {
        console.log(response.data.comments)
        that.setState({
          comments:response.data.comments
        })
      },
      error => {}
    )
  }

  // 获取数据的方法
  getLogPages = () => {
    var that = this
    this.setState({
        offset: this.state.offset + 10
    })
    //发送请求
    getCommentsByArticleId(this.state.id,this.state.offset + 10).then(
      response => {
        console.log(response.data.comments)
        that.setState({
          comments:response.data.comments
        })
      },
      error => {}
    )
  }


  handleOnScroll = () => {
    const { dom } = this
    const contentScrollTop = dom.scrollTop; //滚动条距离顶部
    const clientHeight = dom.clientHeight; //可视区域
    const scrollHeight = dom.scrollHeight; //滚动条内容的总高度
    console.log('dom---------', dom.scrollTop, dom.clientHeight,
        dom.scrollHeight)
    if (contentScrollTop + clientHeight >= scrollHeight - 1) {
        this.getLogPages();    // 获取数据的方法
    }
  }

  imgError = () => {
    const { img } = this
    img.src = 'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/mirror-assets/168e0858b6ccfd57fe5~tplv-t2oaga2asx-no-mark:100:100:100:100.awebp'
  }

  render() {
    return (
      <div className="article-page">
        <div className="article">
          <h1 className="title">{this.state.article_info.title}</h1>
          <div className="author-bar">
            <img className="avatar" src={this.state.author_user_info.avatar_large}
              ref={(c) => { this.img = c }}
              onError={this.imgError}></img>
              <div>
                <div className="name">{this.state.author_user_info.user_name}</div>
                <div className="info">
                  <div className='time'>{getDate(this.state.article_info.ctime)}</div>
                  <div className='look'>阅读 {this.state.article_info.view_count}</div>
                </div>
              </div>
          </div>
          <div className="article-body"></div>
        </div>
        <div className="comment">
          <h2>评论</h2>
          <div className='commentlist'
                ref={(c) => { this.dom = c }}
                onScrollCapture={this.handleOnScroll}>
                <ul>
                    {
                        this.state.comments.map((item) => {
                            return (
                                <li key={item.comment_id}>
                                    <CommentItem
                                        {...item}>
                                    </CommentItem>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
      </div>
    )
  }
}
