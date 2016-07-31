import React from 'react';
import ajax from 'superagent';


class User extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            users: []
        }
    }

    fetchFeed(name) {
        const baseURL = 'https://api.github.com/users';
        ajax.get(`${baseURL}/${name}/events`)
            .end((error, response) => {
                if( !error && response ) {
                    this.setState({users: response.body });
                    console.log(this.state.users[0].actor.login);
                } else {
                    console.error(`Error fetching ${name} `, error);
                }
            });
    }

    componentWillMount (){
       const str = window.location.hash;
       const ptn = /user\/(.*)/g;

       let ptnName = ptn.exec(str)[1];

       this.fetchFeed( ptnName );
    }

    render() {
        return (
            <div>
                {this.state.users.map((user, index) => {
                    return (
                        <p key={index}>
                            id: {user.id} , type:  {user.type}, time :  {user.created_at}
                        </p>
                    );
                })}
            </div>
        );
    }
}

export default User;

