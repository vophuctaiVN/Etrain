import React, { Component } from 'react';
import QuizTopic from './QuizTopic';

export class QuizList extends Component {
    truncate = (str) => { 
        return str.length > 100 ? str.substring(0, 100) + "..." : str;
    }
    render() {
        this.props.gramList.forEach(topicInfo => {
            topicInfo.description = this.truncate(topicInfo.description)
        });
        let listopics = this.props.gramList.map(topicInfo => 
            <QuizTopic 
            id = {topicInfo.id}
            title={topicInfo.title}
            note = {topicInfo.description}
            key={Math.random()}/>
            )
        return ( 
            <div className="row">
                <div className="col-sm-6 col-xl-3 align-self-center">
                <div className="single_feature_text ">
                  <h2>
                    Awesome <br /> Quizs
                  </h2>
                  <p>
                    Chose one topic you like and check how fluently you are in
                    English skils. Login to save your result.
                  </p>
                </div>
              </div>
                {listopics}
            </div>
        );
    }
}

export default QuizList;