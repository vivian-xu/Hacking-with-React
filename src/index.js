import React from 'react';
import ReactDOM from 'react-dom';

import createHistory from 'history/lib/createHashHistory';
// import { Router, Route, IndexRoute, useRouterHistory, hashHistory } from 'react-router';
// import {createHashHistory} from 'history';
import { Router, Route, IndexRoute } from 'react-router';

import App from './pages/App';
import List from './pages/List';
import Detail from './pages/Detail';

ReactDOM.render(
    <Router history={createHistory({ queryKey: false })}
        onUpdate={() => window.scrollTo(0, 0)}>

        <Route path="/" component={ App } >
            // <IndexRoute component={ List } />
            <Route path="/detail/:repo" component={ Detail } />
        </Route>

    </Router>,

    document.getElementById('app')
);

    // <Router history={ useRouterHistory(createHashHistory)({ queryKey: false }) }
    //     onUpdate={ () => window.scrollTo(0, 0) }>
