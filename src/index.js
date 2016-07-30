import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, useRouterHistory, hashHistory } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import {createHashHistory} from 'history';

import Detail from './pages/Detail';


ReactDOM.render(
    <Router history={createHistory({ queryKey: false })}
        onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={ Detail } />
    </Router>,

    document.getElementById('app')
);

    // <Router history={ useRouterHistory(createHashHistory)({ queryKey: false }) }
        // onUpdate={ () => window.scrollTo(0, 0) }>
