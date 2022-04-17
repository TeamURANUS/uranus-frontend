import React, {Component} from 'react';

class NewsList extends Component {
    render() {
        return (<li className="flex mb-2 border-b border-b-gray-200 pb-2 w-full" onClick={() => {
            this.props.onClick(this.props.index);
        }}>
            <img src={this.props.data.image} alt="img"
                 className="object-cover w-52 h-43 min-w-52 max-w-52 min-h-[9rem] max-h-43 rounded"/>
            <div className="flex flex-col ml-4 h-full">
                <span className="font-bold text-xl max-h-[56px] text-clip overflow-hidden">{this.props.data.title}</span>
                <span className="mt-2 text-clip overflow-hidden max-h-[44px] text-gray-500">
                    {this.props.data.text}
                 </span>
                <span className="mt-2 text-gray-600 justify-self-end">
                    <span className="font-bold">{this.props.data.author}</span> {this.props.data.date}</span>
            </div>
        </li>);
    }
}

export default NewsList;
