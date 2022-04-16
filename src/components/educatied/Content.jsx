import React, {Component} from 'react';
import News from "./news/News";
import NewsContent from "./news/NewsContent";
import {Calendar} from "antd";
import GroupContent from "./home/GroupContent";

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {
                image: "",
                title: "",
                text: "",
                author: "",
                date: ""
            }
        };
    }

    openNews = (url, title, author, date, text) => {
        this.props.onNewsClick();
        this.setState({
            news: {
                image: url,
                title: title,
                text: text,
                author: author,
                date: date
            }
        });
    };


    render() {
        return (
            <div className="mt-[5rem]">
                {this.props.active === 1 ?
                    <GroupContent
                        activeGroup={this.props.activeGroup}
                        activeGroupIndex={this.props.activeGroupIndex}
                        user={this.props.user}
                        classes={this.props.classes}
                        communities={this.props.communities}
                        posts={this.props.posts}
                        createPost={this.props.createPost}
                        readPost={this.props.readPost}
                        readPostIndex={this.props.readPostIndex}
                        setReadPost={this.props.setReadPost}
                        search={this.props.search}
                        users={this.props.users}
                        setCreatePost={this.props.setCreatePost}
                    />
                    : this.props.active === 2 ? <Calendar/>
                        : this.props.active === 3 ?
                            <div>
                                {this.props.newsOpen ?
                                    <div className="ml-5 mr-3 mt-3">
                                        <button onClick={this.props.newsClose}
                                                className="mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                            Go back
                                        </button>
                                        <NewsContent
                                            title={this.state.news.title}
                                            image={this.state.news.image}
                                            author={this.state.news.author}
                                            date={this.state.news.date}
                                            text={this.state.news.text}
                                        />
                                    </div>
                                    :
                                    <div>
                                        <p className="font-bold text-2xl ml-5 mt-5">News</p>
                                        <ul className="ml-5 mr-3 select-none">
                                            <News
                                                image={"https://source.unsplash.com/random/1920x1080/?wallpaper,landscape," + Math.random()}
                                                title="Duis in neque pharetra, porta sem eget, posuere ante. Suspendisse egestas, ipsum vel aliquet aliquet, arcu metus eleifend arcu, sit amet lacinia risus ante id arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur sed facilisis dolor. Mauris facilisis congue lectus,"
                                                text="Pellentesque quis bibendum arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus urna sem, bibendum porttitor lorem vel, semper bibendum sapien. Nunc dictum turpis id lorem egestas aliquet. Donec condimentum ligula lectus, eget tempor leo consectetur ut. Proin blandit ac nulla id blandit. Nullam at nibh ut leo mattis posuere. Morbi sit amet enim mi. Aenean rhoncus nec libero non malesuada. Etiam lorem eros, pulvinar quis turpis nec, molestie ornare erat. Proin auctor ex cursus, fringilla ante nec, congue justo. Vestibulum ut hendrerit odio, nec sagittis lorem. Sed finibus vitae nunc mattis bibendum. Suspendisse at massa nec magna egestas vestibulum sed nec dolor.

Integer auctor velit id pretium ullamcorper. Integer ullamcorper lectus non purus finibus finibus. Integer venenatis pharetra pharetra. Suspendisse imperdiet ipsum et neque imperdiet, ac rhoncus quam volutpat. Fusce id porta nibh. Nunc non aliquam dolor, ac lobortis erat. Proin finibus placerat purus. Vestibulum aliquet molestie sapien, ac bibendum diam aliquam ornare. Donec suscipit diam et lorem commodo pulvinar non non justo. Nulla scelerisque efficitur bibendum. Pellentesque rhoncus mattis tellus. Morbi eu lacus semper, fringilla diam id, sodales justo. Phasellus blandit eu justo sed bibendum. Sed ac eleifend sem."
                                                author="Ekrem Sönmezer"
                                                date="10 March 2022"
                                                onClick={() => {
                                                    this.openNews("https://source.unsplash.com/random/1920x1080/?wallpaper,landscape," + Math.random(), "Duis in neque pharetra, porta sem eget, posuere ante. Suspendisse egestas, ipsum vel aliquet aliquet, arcu metus eleifend arcu, sit amet lacinia risus ante id arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur sed facilisis dolor. Mauris facilisis congue lectus, ut finibus enim viverra nec.", "author", "date", "Pellentesque quis bibendum arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus urna sem, bibendum porttitor lorem vel, semper bibendum sapien. Nunc dictum turpis id lorem egestas aliquet. Donec condimentum ligula lectus, eget tempor leo consectetur ut. Proin blandit ac nulla id blandit. Nullam at nibh ut leo mattis posuere. Morbi sit amet enim mi. Aenean rhoncus nec libero non malesuada. Etiam lorem eros, pulvinar quis turpis nec, molestie ornare erat. Proin auctor ex cursus, fringilla ante nec, congue justo. Vestibulum ut hendrerit odio, nec sagittis lorem. Sed finibus vitae nunc mattis bibendum. Suspendisse at massa nec magna egestas vestibulum sed nec dolor.\n" +
                                                        "\n" +
                                                        "Integer auctor velit id pretium ullamcorper. Integer ullamcorper lectus non purus finibus finibus. Integer venenatis pharetra pharetra. Suspendisse imperdiet ipsum et neque imperdiet, ac rhoncus quam volutpat. Fusce id porta nibh. Nunc non aliquam dolor, ac lobortis erat. Proin finibus placerat purus. Vestibulum aliquet molestie sapien, ac bibendum diam aliquam ornare. Donec suscipit diam et lorem commodo pulvinar non non justo. Nulla scelerisque efficitur bibendum. Pellentesque rhoncus mattis tellus. Morbi eu lacus semper, fringilla diam id, sodales justo. Phasellus blandit eu justo sed bibendum. Sed ac eleifend sem.");
                                                }}
                                                id="123"
                                            />
                                            <News
                                                image={"https://source.unsplash.com/random/1920x1080/?wallpaper,landscape," + Math.random()}
                                                title="Lorem Ipsum dolar sit amet"
                                                text="lorem ipsum dolar sit amet"
                                                author="Ekrem Sönmezer"
                                                date="10 March 2022"
                                                onClick={() => {
                                                    this.openNews("url", "title", "author", "date", "text");
                                                }}
                                                id="123"
                                            />
                                            <News
                                                image={"https://source.unsplash.com/random/1920x1080/?wallpaper,landscape," + Math.random()}
                                                title="Lorem Ipsum dolar sit amet"
                                                text="lorem ipsum dolar sit amet"
                                                author="Ekrem Sönmezer"
                                                date="10 March 2022"
                                                onClick={() => {
                                                    this.openNews("url", "title", "author", "date", "text");
                                                }}
                                                id="123"
                                            />
                                            <News
                                                image={"https://source.unsplash.com/random/1920x1080/?wallpaper,landscape," + Math.random()}
                                                title="Lorem Ipsum dolar sit amet"
                                                text="lorem ipsum dolar sit amet"
                                                author="Ekrem Sönmezer"
                                                date="10 March 2022"
                                                onClick={() => {
                                                    this.openNews("url", "title", "author", "date", "text");
                                                }}
                                                id="123"
                                            />
                                            <News
                                                image={"https://source.unsplash.com/random/1920x1080/?wallpaper,landscape," + Math.random()}
                                                title="Lorem Ipsum dolar sit amet"
                                                text="lorem ipsum dolar sit amet"
                                                author="Ekrem Sönmezer"
                                                date="10 March 2022"
                                                onClick={() => {
                                                    this.openNews("url", "title", "author", "date", "text");
                                                }}
                                                id="123"
                                            />
                                            <News
                                                image={"https://source.unsplash.com/random/1920x1080/?wallpaper,landscape," + Math.random()}
                                                title="Lorem Ipsum dolar sit amet"
                                                text="lorem ipsum dolar sit amet"
                                                author="Ekrem Sönmezer"
                                                date="10 March 2022"
                                                onClick={() => {
                                                    this.openNews("url", "title", "author", "date", "text");
                                                }}
                                                id="123"
                                            />
                                            <News
                                                image={"https://source.unsplash.com/random/1920x1080/?wallpaper,landscape," + Math.random()}
                                                title="Lorem Ipsum dolar sit amet"
                                                text="lorem ipsum dolar sit amet"
                                                author="Ekrem Sönmezer"
                                                date="10 March 2022"
                                                onClick={() => {
                                                    this.openNews("url", "title", "author", "date", "text");
                                                }}
                                                id="123"
                                            />
                                            <News
                                                image={"https://source.unsplash.com/random/1920x1080/?wallpaper,landscape," + Math.random()}
                                                title="Lorem Ipsum dolar sit amet"
                                                text="lorem ipsum dolar sit amet"
                                                author="Ekrem Sönmezer"
                                                date="10 March 2022"
                                                onClick={() => {
                                                    this.openNews("url", "title", "author", "date", "text");
                                                }}
                                                id="123"
                                            />


                                        </ul>
                                    </div>
                                }
                            </div>
                            : this.props.active === 4 ? "notifs"
                                : "settings"
                }
            </div>
        );
    }
}

export default Content;
