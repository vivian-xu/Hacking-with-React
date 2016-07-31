import React from 'react';
import ajax from 'superagent';


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
            <ul>
                <p> Content for { this.props.params.user } to go here. </p>
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
        );
    }
}

export default User;

