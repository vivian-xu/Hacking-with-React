import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import { IndexLink, link } from 'react-router';

import routes from './routes';

ReactDOM.render(
    <Router history={createHistory({ queryKey: false })}
        onUpdate={() => window.scrollTo(0, 0)}>

        {routes}

    </Router>,

    document.getElementById('app')
);

// import { Router, Route, IndexRoute, useRouterHistory, hashHistory } from 'react-router';
// import {createHashHistory} from 'history';


    // <Router history={ useRouterHistory(createHashHistory)({ queryKey: false }) }
    //     onUpdate={ () => window.scrollTo(0, 0) }>
