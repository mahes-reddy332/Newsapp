import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps = {
      pageSize : 8,
      country :"in",
      category :"sports"
  }
  static defaultTypes = {
    pageSize :PropTypes.string,
    country :PropTypes.number,
    category :PropTypes.string
}
Capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor(props){
    super(props);
    console.log("this is mahesh");
    this.state={
      articles:[],
      page:1,
      loading:true,
      totalResults: 0,
      hasMore:true
    }
    document.title=`${this.Capitalize(this.props.category)}-News Monkey`
  }

  async updateNews(pageNo){
    this.props.setProgress(10);
    let url=`https://newsapi.org/v2/everything?q=tesla&from=2024-08-20&sortBy=publishedAt&apiKey=265840df5b9e47bf84528238bee80fc6`;
    this.setState({loading:true});
    this.props.setProgress(30);
    let data=await fetch(url);
    let parsedData =await data.json();
    this.props.setProgress(70);
    this.setState({articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false,
      hasMore: this.state.articles.length < parsedData.totalResults
    })
      this.props.setProgress(100);
      
  }
   async componentDidMount(){
    // console.log("cdm");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=92d5f40b854d4247838345eb803ab5cf&page=1&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parsedData =await data.json();
    // this.setState({articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading:false})
    this.updateNews()
  }

  handleNextClick =async ()=>{
    // console.log("next");
    // // if(!(this.state.page+1>Math.ceil(this.state.totalResults/20))){
    //   this.setState({loading:true});
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=92d5f40b854d4247838345eb803ab5cf&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    // let data=await fetch(url);
    // let parsedData =await data.json();
    // this.setState({
    //   page:this.state.page+1,
    //   articles: parsedData.articles,
    //   loading: false

    // })
    this.setState({page : this.state.page+1})
    this.updateNews();

  }
  
  handlePrevClick=async ()=>{
    // this.setState({loading:true});
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=92d5f40b854d4247838345eb803ab5cf&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
    // let data=await fetch(url);
    // let parsedData =await data.json();
    // this.setState({
    //   page: this.state.page-1,
    //   articles: parsedData.articles,
    //   loading: false

    // })
    this.setState({page : this.state.page-1})
    this.updateNews();

  }

  fetchMoreData = async () => {
    // this.setState({page : this.state.page+1})
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=92d5f40b854d4247838345eb803ab5cf&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    this.setState({page : this.state.page+1})
    let data=await fetch(url);
    let parsedData =await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      hasMore: this.state.articles.length + parsedData.articles.length < parsedData.totalResults
      })
  };

  render() {
    return (
      <>
        <h2 className='text-center' style={{marginTop:'90px'}}> News Monkey - Top {this.Capitalize(this.props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={this.state.hasMore ? <Spinner/> : null}
        >
      
        <div className="container">
        <div className="row">
          { this.state.articles.map((element)=>{
            return <div className="col md-4 my-3" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
          
        </div>
        </div>
        
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        </InfiniteScroll>
      </>
      
    )
  }
}

export default News
