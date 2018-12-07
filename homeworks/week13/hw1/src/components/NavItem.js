import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

class NavItem extends Component {
    render() {
        const {to, exact, label} = this.props;
        return (
            <Route
                path={to}
                exact={exact}
                children={({ match }) => (
                    <li className={match ? "nav-item active" : "nav-item"}>
                        <Link className="nav-link" to={to}>{label}</Link>
                    </li>
                )}
            />
        );
    }
}

export default NavItem;
