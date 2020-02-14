import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, matchPath } from "react-router-dom";
import Step from '../Step/Step';
import data from '../../dummyData.json';
import Card from '../Card/Card';

class Stage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resources: []
        }

        this.url = "https://citrineu.herokuapp.com/api"
        this.url2 = "http://localhost:5000/api"
    }

    // componentDidMount() {
    //     // In reality, I'll be fetching from the API here, but importing dummy data from json file for now.

    //     fetch(`${this.url2}/v1/stages/${this.props.match.params.stageId}`)
    //         .then(response => response.json())
    //         .then(data => this.setState({ resources: data.resources }));
    // }

    generateStepComponents = (steps) => {
        return steps.map(step => 
            <div className="module p100 mtm">
                <Card 
                    content={step} 
                    buttonText="Begin Step"
                    buttonTheme="light" 
                    path={this.props.match.url} />
            </div>
        )
    }

    get activeContentId() {
        const matchProfile = matchPath(this.props.location.pathname, {
            path: `/courses/:courseId/:stageId/:stepId`,
        });

        return (matchProfile && matchProfile.params) ? matchProfile.params.stepId : '';
    }

    render() {
        const stage = this.props.stages.find(stage => stage.id == this.props.match.params.stageId);
        
        return (
            <div>
{
                stage !== undefined
                ?<div className="module per100">
                    <h2 className="titlecase mbm">{ stage.title }</h2>
                    <p className="large">{ stage.description }</p>

                    <div className="container">
                        { this.generateStepComponents(stage.steps) }
                    </div>
                </div>
                : <div>loading....</div>
            }
            </div>
            
            
        );
    }
}

export default Stage;