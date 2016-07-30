import React from 'react';
import ajax from 'superagent';


class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'commits',
            commits: [],
            forks: [],
            pulls: []
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

    renderCommits() {
        return this.state.commits.map((commit, index) => {
            const author = commit.author ? commit.author.login : 'Anonymous';
            return (<p key={index}>
                <strong>{author}</strong>:
                <a href={commit.html_url}>{commit.commit.message}</a>.
            </p>);
        });
    }

    renderForks() {
        return this.state.forks.map((fork, index) => {
            const owner = fork.owner ? fork.owner.login : 'Anonymous';
            return (<p key={index}>
                <strong>{owner}</strong>: forked to
                <a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
                </p>);
        });
    }

    renderPulls() {
        return this.state.pulls.map((pull, index) => {
            const user = pull.user ? pull.user.login : 'Anonymous';
            return (<p key={index}>
                <strong>{user}</strong>:
                <a href={pull.html_url}>{pull.body}</a>.
                </p>);
        });
    }

    showCommits() {
        this.setState({ mode: 'commits' });
    }

    showForks() {
        this.setState({ mode: 'forks' });
    }

    showPulls() {
        this.setState({ mode: 'pulls' });
    }

    render() {
        let content;

        if(this.state.mode === 'commits') {
            content = this.renderCommits();
        } else if (this.state.mode === 'forks') {
            content = this.renderForks();
        } else {
            content = this.renderPulls();
        }


        return (<div>

            <button onClick = {this.showCommits.bind(this)} > Show Commits </button>
            <button onClick = {this.showForks.bind(this)}> Show Forks </button>
            <button onClick = {this.showPulls.bind(this)}> Show Pulls </button>

            {content}

        </div>);
    }
}



export default Detail;

