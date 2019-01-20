import React from 'react';
import './AppContainer.scss';

import App from './App';
import Error from '../Error/Error';
import WasteWizard from '../../services/WasteWizard';

/**
 * AppContainer components renders:
 * 1 - App title
 * 2 - If App is not ready: loading...
 *     Else if something went wrong: Error component
 *     Else: App component
 */
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: 0, // 0: Loading, 1: Ready, 2: Something went wrong
    };

    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  // Init the WasteWizard and update the App ready state
  init() {
    WasteWizard.init()
      .then(() => {
        this.setState({
          ready: 1, // App is ready
        });
      }).catch(() => {
        this.setState({
          ready: 2, // Something went wrong
        });
      });
  }

  render() {
    const { ready } = this.state;

    let app = [];

    if (ready === 0) app = (
      <span className="loading">
          Loading...
      </span>
    );
    else if (ready === 1) app = <App />;
    else app = <Error msg="Something went wrong" onRetry={this.init} />;

    return (
      <div className="app-container">
        <h1 className="app-title">
          Toronto Waste Lookup
        </h1>
        { app }
      </div>
    );
  }
}

export default AppContainer;
