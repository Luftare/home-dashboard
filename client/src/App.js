import React, { Component } from 'react';
import styled from 'styled-components';

import Calendar from './modules/calendar';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  color: white;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      viewIndex: 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        viewIndex: this.state.viewIndex + 1,
      });
    }, 5000);
  }

  render() {
    return (
      <Container>
        <Calendar />
      </Container>
    );
  }
}

export default App;
