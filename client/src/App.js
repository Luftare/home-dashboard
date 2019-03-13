import React, { Component } from 'react';
import styled from 'styled-components';

import Calendar from './modules/calendar';
import Weather from './modules/weather';
import Transportation from './modules/transportation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  color: white;
  padding: 64px;
  box-sizing: border-box;
`;
const Double = styled.div`
  display: flex;
  > * {
    width: 50%;
  }
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Double>
          <Calendar />
          <Transportation />
        </Double>
        <Weather />
      </Container>
    );
  }
}

export default App;
