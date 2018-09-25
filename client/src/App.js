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
  render() {
    return (
      <Container>
        <Calendar />
        <Module>Jee!</Module>
        <Module>Jee!</Module>
        <Module>Jee!</Module>
      </Container>
    );
  }
}

export default App;
