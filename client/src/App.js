import React, { Component } from 'react';
import styled from 'styled-components';

import Calendar from './modules/calendar';
import Weather from './modules/weather';

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

class App extends Component {
  render() {
    return (
      <Container>
        <Calendar />
        <Weather />
      </Container>
    );
  }
}

export default App;
