import React, { Component } from 'react';
import GramTopic from './GramTopic';

export class GramList extends Component {
    truncate = (str) => { 
        return str.length > 100 ? str.substring(0, 100) + "..." : str;
    }
    render() {
        this.props.gramList.forEach(topicInfo => {
            topicInfo.description = this.truncate(topicInfo.description)
        });
        let listopics = this.props.gramList.map(topicInfo => 
            <GramTopic 
            id = {topicInfo.id}
            imgUrl ={topicInfo.imageURL}
            level= {topicInfo.level}
            title={topicInfo.title}
            note = {topicInfo.description}
            key={Math.random()}/>
            )
        return ( 
            <div className="row">
                {listopics}
            </div>
        );
    }
}

export default GramList;