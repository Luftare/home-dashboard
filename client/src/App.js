import React, { Component } from 'react';
import styled from 'styled-components';

import Calendar from './modules/calendar';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  color: white;

  > * {
    width: 50%;
  }
`;

const Module = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
        <Module>Jaahas!</Module>
        <Module>Skulaa!</Module>
        <Module>Jee! {this.state.viewIndex}</Module>
      </Container>
    );
  }
}

export default App;
