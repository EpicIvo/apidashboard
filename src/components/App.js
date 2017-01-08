import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
        <div>
          <header>
              <nav className="nav navbar-default">
                <IndexLink to="/">VTM</IndexLink>
                {' | '}
                <Link to="/platforms">Platforms</Link>
              </nav>
          </header>
            <div className="container">
                {this.props.children}
            </div>
        </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
