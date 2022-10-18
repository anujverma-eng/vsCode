import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ReactDOM from "react-dom";
// import Pet from "./Pet";
import SearchParams from './SearchParams.mjs';
import Details from './Details.mjs';

const App = () => {
    return (
        <div>
            <Router>
            <header><Link to="/"><h1>Adopt Me!</h1></Link></header>
                <Switch>
                    <Route path="/details/:id">
                        <Details />
                    </Route>
                    <Route path="/">
                        <SearchParams />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));