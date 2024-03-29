import React, { Component } from 'react';
import './index.css'
import { getArticles, getArticleById } from '../../fake-api';
import ArticleItem from '../ArticleItem';
import PubSub from 'pubsub-js';
import { withRouter } from 'react-router-dom';


class ArticleList extends Component {
    state = {
        articles: [],
        offset: 0,
        tab1: 0,
        tab2: 0,
        hometab: 'hot'
    }

    componentDidMount() {
        var that = this
        const { dom } = this

        //初始化推荐文章
        getArticles(0, 'hot').then(
            response => {
                console.log('articles-----', response);
                this.setState(response.data)
            },
            error => {
                console.log(error)
            }
        )

        //订阅tab1点击
        this.tab1token = PubSub.subscribe('ArticleTab1 click', (_, data) => {
            console.log('文章列表订阅到ArticleTab1 click', data)
            this.setState({
                offset: 0,
                tab1: Number(data),
                tab2: 0
            })
            dom.scrollTop = 0
            //发送article请求
            getArticles(Number(data), this.state.hometab).then(
                response => {
                    console.log('articles-----', response);
                    this.setState(response.data)
                },
                error => {
                    console.log(error)
                }
            )
        })

        //订阅tab2点击
        this.tab2token = PubSub.subscribe('ArticleTab2 click', (_, data) => {
            console.log('文章列表订阅到ArticleTab2 click', data)
            this.setState({
                offset: 0,
                tab2: Number(data)
            })
            dom.scrollTop = 0
            //发送article请求
            getArticles(Number(data), this.state.hometab).then(
                response => {
                    console.log('articles-----', response);
                    this.setState(response.data)
                },
                error => {
                    console.log(error)
                }
            )
        })

        //订阅hometab选择
        this.hometoken = PubSub.subscribe('HomeTab click', (_, data) => {
            console.log('文章列表订阅到HomeTab click', data)
            this.setState({
                offset: 0,
                hometab: data
            })
            dom.scrollTop = 0
            if (data === 'history') {
                var storage = window.localStorage
                var articleHistory = storage.articleHistory;
                if(articleHistory===undefined){
                    this.setState({
                        articles: []
                    })
                }
                else{
                    var idArray = articleHistory.split(",")
                    var articleArray = []
                    idArray.forEach(element => {
                        getArticleById(element).then(
                            response => {
                                console.log(response.data.article)
                                articleArray.push(response.data.article)
                            },
                            error => { }
                        )
                    })
                    //异步等待forEach完成
                    Promise.all(articleArray).then(() => {
                        console.log(articleArray)
                        this.setState({
                            articles: articleArray
                        })
                    })
                }
            } else {
                //发送article请求
                var category = this.state.tab1;
                if (this.state.tab2 != 0) {
                    category = this.state.tab2
                }
                getArticles(category, data).then(
                    response => {
                        console.log('articles-----', response);
                        this.setState(response.data)
                    },
                    error => {
                        console.log(error)
                    }
                )
            }
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.tab1token)
        PubSub.unsubscribe(this.tab2token)
        PubSub.unsubscribe(this.hometoken)
    }

    // 获取数据的方法
    getLogPages = () => {
        var that = this
        this.setState({
            offset: this.state.offset + 10
        })
        //发送article请求
        var category = this.state.activeNum;
        if (this.state.tab2 != 0) {
            category = this.state.tab2
        }
        getArticles(category, this.state.hometab, this.state.offset + 10).then(
            response => {
                console.log('articles-----', response);
                this.setState({
                    articles: that.state.articles.concat(response.data.articles)
                })
            },
            error => {
                console.log(error)
            }
        )
        console.log('after refresh', this.state.offset)
    }


    handleOnScroll = () => {
        const { dom } = this
        const contentScrollTop = dom.scrollTop; //滚动条距离顶部
        const clientHeight = dom.clientHeight; //可视区域
        const scrollHeight = dom.scrollHeight; //滚动条内容的总高度
        console.log('dom---------', dom.scrollTop, dom.clientHeight,
            dom.scrollHeight)
        if ((contentScrollTop + clientHeight >= scrollHeight - 1) && this.state.hometab !== 'history') {
            this.getLogPages();    // 获取数据的方法
        }
    }

    clickArticle = (e) => {
        var cur = e.target
        while (cur.nodeName !== 'LI') {
            cur = cur.parentNode
        }
        console.log(cur.id)
        var storage = window.localStorage;
        // 写入缓存
        var articleHistory = storage.articleHistory
        var idArray = []
        if(articleHistory===undefined){
            idArray.push(cur.id)
        }else{
            //去重加入
            idArray = articleHistory.split(",")
            var flag = true
            var round = 0
            idArray.forEach(element => {
                if(element===cur.id){
                    flag = false
                }
                round++
            })
            while(round<idArray.length){}
            if(flag){
                idArray.push(cur.id)
            }
        }
        storage['articleHistory'] = idArray;
        console.log(window.localStorage)
        this.props.history.push(`/article?id=${cur.id}`);
    }

    render() {
        return (
            <div className='articlelist'
                ref={(c) => { this.dom = c }}
                onScrollCapture={this.handleOnScroll}>
                <ul>
                    {
                        this.state.articles.map((item) => {
                            return (
                                <li key={item.article_id}
                                    id={item.article_id}
                                    onClick={this.clickArticle} >
                                    <ArticleItem
                                        {...item}>
                                    </ArticleItem>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(ArticleList);
