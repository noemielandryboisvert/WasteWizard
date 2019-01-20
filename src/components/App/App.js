import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    //
  }

  render() {
    const hello = 1;

    return (
      <div className="app">
        {hello}
      </div>
    );
  }
}

export default App;
