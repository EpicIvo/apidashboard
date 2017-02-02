import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <nav className="nav navbar-default">
            <IndexLink to="/">Home</IndexLink>
            |
            <IndexLink to="/v1/new">New receipt</IndexLink>
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
