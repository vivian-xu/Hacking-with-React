import React from 'react';
import ajax from 'superagent';


class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            commits: [],
            forks: [],
            pulls: [],
            datas: [ {author: 'AUTHOR',
            text: 'TEXT',
            url: 'url'
            }]
        };
    }


    componentWillMount() {
        // commits
        ajax.get( 'https://api.github.com/repos/facebook/react/commits' )
            .end((error, response) => {
                            if (!error && response) {
                                this.setState({ commits: response.body });
                            } else {
                                console.log( 'There was an error frtching from Github / COMMITS' , error );
                            }
                        });

        // forks
        ajax.get( 'https://api.github.com/repos/facebook/react/forks' )
            .end((error, response) => {
                            if (!error && response) {
                                this.setState({ forks: response.body });
                            } else {
                                console.log( 'There was an error frtching from Github / FORKS' , error );
                            }
                        });

        // pulls
        ajax.get( 'https://api.github.com/repos/facebook/react/pulls' )
            .end((error, response) => {
                            if (!error && response) {
                                this.setState({ pulls: response.body });
                            } else {
                                console.log( 'There was an error frtching from Github / PULLS' , error );
                            }
                        });
    }

    setNeedState( which ) {
        let datas = [];
        let author, text, url;

        // commits
        if( which == 'commits' ) {

            console.log('COMMITS');
            this.state.commits.map((commit, index) => {
                author = commit.author ? commit.author.login : 'Anonymous';
                text = commit.commit.message;
                url = commit.html_url;

                datas.push({author: author, text: text, url: url});
            });
        };

        // forks
        if( which == 'forks' ) {
            this.state.forks.map((fork, index) => {
                author = fork.owner ? fork.owner.login : 'Anonymous';
                text = fork.description;
                url = fork.owner? fork.owner.html_url : fork.forks_url;

                datas.push({author: author, text: text, url: url});
            });
        };

        // pulls
        if( which == 'pulls' ) {
            this.state.pulls.map((pull, index) => {
                author = pull.user ? pull.user.login : 'Anonymous';
                text = pull.body;
                url = pull.html_url;

                datas.push({author: author, text: text, url: url});

            });
        };

        this.setState({datas: datas});
    }

    commitsHandleClicked (commits) {
        console.log("commits");
        this.setNeedState("commits");
    }


    forksHandleClicked (forks) {
        console.log("forks");
        this.setNeedState("forks");
    }


    pullsHandleClicked (pulls) {
        console.log("pulls");
        this.setNeedState("pulls");
    }


    render() {

        var renderDatas = this.state.datas.map((data, index) => {

            return (
                <p key={index}>
                    <strong> {data.author} :  </strong>
                    <a href = {data.url} > {data.text} </a>
                </p>
            )
        })

        return (<div>

            <button onClick = {this.commitsHandleClicked.bind(this)} > Show Commits </button>
            <button onClick = {this.forksHandleClicked.bind(this)}> Show Forks </button>
            <button onClick = {this.pullsHandleClicked.bind(this)}> Show Pulls </button>

            <h3>datas</h3>
            {renderDatas}
        </div>);
    }
}



export default Detail;

