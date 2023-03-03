import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Events from '../pages/local/sections/Events';
import Fire from '../pages/local/sections/Fire';
import Mantenaince from '../pages/local/sections/Mantenaince';

function NewSidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/view1">Vista 1</Link></li>
                <li><Link to="/view2">Vista 2</Link></li>
                <li><Link to="/view3">Vista 3</Link></li>
            </ul>
            <Routes>
                <Route path="/view1" component={Fire} />
                <Route path="/view2" component={Events} />
                <Route path="/view3" component={Mantenaince} />
            </Routes>
        </div>
    );
}

export default NewSidebar;