import React from 'react';
import ReactDOM from 'react-dom';

import createHistory from 'history/lib/createHashHistory';
// import { Router, Route, IndexRoute, useRouterHistory, hashHistory } from 'react-router';
// import {createHashHistory} from 'history';
import { Router, Route, IndexRoute } from 'react-router';


import Detail from './pages/Detail';
import List from './pages/List'

ReactDOM.render(
    <Router history={createHistory({ queryKey: false })}
        onUpdate={() => window.scrollTo(0, 0)}>

        <Route path="/" component={ List } />
        <Route path="/react" component={ Detail } />
    </Router>,

    document.getElementById('app')
);

    // <Router history={ useRouterHistory(createHashHistory)({ queryKey: false }) }
    //     onUpdate={ () => window.scrollTo(0, 0) }>
