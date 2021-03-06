import React from 'react';
import ajax from 'superagent';

import { IndexLink, link } from 'react-router';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        }
    }

    componentWillMount (){

        const baseURL = 'https://api.github.com/users';
        ajax.get(`${baseURL}/${this.props.params.user}/events`)
            .end((error, response) => {
                    if( !error && response ) {
                        this.setState({events: response.body });
                } else {
                    console.error(`Error fetching ${name} `, error);
             }
        });
    }

    render() {
        return (
            <div>
                <p> You are here:
                    <IndexLink to="/" activeClassName="active">Home </IndexLink>
                    > {this.props.params.user}
                </p>
                <ul>
                    {this.state.events.map((event, index) => {
                        const eventType = event.type;
                        const repoName = event.repo.name;
                        const createDate = event.created_at;

                        return (
                            <li key={index} >
                                <strong> {repoName} </strong> : {eventType} at {createDate}.
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default User;

