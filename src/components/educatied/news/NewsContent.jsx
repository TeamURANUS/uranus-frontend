import React, {Component} from 'react';
import NewsList from "./NewsList";
import NewsDetail from "./NewsDetail";
import {getNews} from "../../../services/news";

class NewsContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {
                image: "",
                title: "",
                text: "",
                author: "",
                date: "",
                id: "",
                url: ""
            },
            newsList: []
        };
    }

    async componentDidMount() {
        let result = await getNews();
        result = result.data.data.map(x => ({
            id: x.id,
            image: x.documentContent[0],
            text: x.documentContent[1],
            author: x.documentAuthor,
            date: x.documentDate,
            title: x.documentTitle,
            url: x.documentId
        })).sort((a, b) => parseInt(a.date.split(" ")[0]) < parseInt(b.date.split(" ")[0]) ? -1 : 1);
        this.setState({newsList: result});
    }

    openNews = (index) => {
        this.props.onNewsClick();
        this.setState({
            news: {
                image: this.state.newsList[index].image,
                title: this.state.newsList[index].title,
                text: this.state.newsList[index].text,
                author: this.state.newsList[index].author,
                date: this.state.newsList[index].date,
                url: this.state.newsList[index].url,
            }
        });
    };

    render() {
        return (
            <div>
                {this.props.newsOpen ?
                    <div className="ml-5 mr-3 mt-3">
                        <button onClick={this.props.newsClose}
                                className="mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Go back
                        </button>
                        <NewsDetail
                            title={this.state.news.title}
                            image={this.state.news.image}
                            author={this.state.news.author}
                            date={this.state.news.date}
                            text={this.state.news.text}
                            url={this.state.news.url}
                        />
                    </div>
                    :
                    <div>
                        <p className="font-bold text-2xl ml-5 mt-5">News</p>
                        <ul className="ml-5 mr-3 select-none">
                            {this.state.newsList.map((item, index) => {
                                return <NewsList index={index} key={index} data={item} onClick={this.openNews}/>;
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

export default NewsContent;
