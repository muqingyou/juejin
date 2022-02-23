import React, { Component } from 'react';
import HomeTab from '../../components/HomeTab';
import ArticleTab1 from '../../components/ArticleTab1';
// import ArticleTab2 from '../../components/ArticleTab2';
import ArticleList from '../../components/ArticleList';
import {getCategories,getArticles} from '../../fake-api';
import './index.css';
import PubSub from 'pubsub-js';

export default class Home extends Component {
    state={categories:[]}

    componentDidMount(){
        //初始化分类
        getCategories().then(
            response => {
                this.setState({categories:response.data.categories})
            },
            error => {
                console.log(error)
            }
        )
    }

    render() {
        
        return (
            <div className='home'>
                <div className="header">
                    <ArticleTab1 categories={this.state.categories}></ArticleTab1>
                    {/* <ArticleTab2></ArticleTab2> */}
                </div>
                <div className="body">
                    <HomeTab></HomeTab>
                    <ArticleList></ArticleList>
                </div>
            </div>
        )
    }
}
