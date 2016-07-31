import React from 'react';
import { Link } from 'react-router';
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

    fetchFeed(type) {
        const baseURL = 'https://api.github.com/repos/facebook';
       ajax.get( `${baseURL}/${this.props.params.repo}/${type}` )
           .end((error, response) => {
                           if (!error && response) {
                               this.setState({ [type] : response.body });
                           } else {
                               console.log( `Error fetching ${type}` , error );
                           }
                       });
    }

    componentWillMount() {
        this.fetchFeed( 'commits' );
        this.fetchFeed( 'forks' );
        this.fetchFeed( 'pulls' );
    }

    renderModes ( mode ) {
        console.log(mode);
        let author, url, text;
        let datas = [];
        if( mode === 'commits') {
             this.state.commits.map((commit, index) => {
                author = commit.author ? commit.author.login : 'Anonymous';
                url = commit.html_url;
                text = commit.commit.message;
                datas.push({author: author, url: url, text: text});
            });
        } else if (mode === 'forks' ) {
            console.log("mode==='forks");

            this.state.forks.map((fork, index) => {
                author =  fork.owner ? fork.owner.login : 'Anonymous';
                url = fork.html_url;
                text = fork.created_at;
                datas.push({author: author, url: url, text: text});
            });
        } else {
            this.state.pulls.map((pull, index) => {
                author = pull.user ? pull.user.login : 'Anonymous';
                url = pull.html_url;
                text = pull.body;
                datas.push({author: author, url: url, text: text});
            });
        };

        return (datas.map((data,index) => {
            let userUrl = `/user/${data.author}`;
            let linkAnonymous

            if( data.author === 'Anonymous' ) {
                linkAnonymous = (<strong> {data.author} : </strong>)
            } else {
                linkAnonymous = <Link to={userUrl} > {data.author} : </Link>
            }

            return (<p key={index}>
                {linkAnonymous}
                <a href={data.url}>{data.text}</a>.
            </p>);
        }));
    }

    selectMode(event) {
        this.setState({ mode: event.currentTarget.dataset.mode });
    }

    render() {
        let content;

        if(this.state.mode === 'commits') {
            content = this.renderModes('commits');
        } else if (this.state.mode === 'forks') {
            content = this.renderModes('forks');
        } else {
            content = this.renderModes('pulls');
        }


        return (<div>

            <button onClick = {this.selectMode.bind(this)} data-mode="commits" > Show Commits </button>


            <button onClick = {this.selectMode.bind(this)} data-mode="forks"> Show Forks </button>


            <button onClick = {this.selectMode.bind(this)} data-mode="pulls"> Show Pulls </button>

            {content}

        </div>);
    }
}



export default Detail;

