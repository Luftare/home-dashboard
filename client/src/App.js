import React, { Component } from 'react';
import styled from 'styled-components';

import Calendar from './modules/calendar';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  color: white;
  padding: 64px;
  box-sizing: border-box;
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
