import React, {Component} from 'react';

class NewsDetail extends Component {
    render() {
        return (
            <div className="flex flex-col">
                <img src={this.props.image} alt="img"
                     className="object-cover min-h-[16rem] max-h-[20rem] rounded mb-3"/>
                <span
                    className="font-bold text-2xl text-clip overflow-hidden block">{this.props.title}</span>
                <span className="mt-2 text-gray-600 justify-self-end block mb-3">
                    <span className="font-bold">{this.props.author}</span> {this.props.date}</span>
                <a href={this.props.url} target="_blank" className="text-blue-600 hover:underline font-bold">Click for details</a>
                <span className="mt-2 leading-loose text-gray-500">
                    {this.props.text}
                 </span>

            </div>
        );
    }
}

export default NewsDetail;
