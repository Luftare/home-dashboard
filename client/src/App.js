import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  color: white;
`;

const Module = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Module>Jee!</Module>
        <Module>Jee!</Module>
        <Module>Jee!</Module>
        <Module>Jee!</Module>
      </Container>
    );
  }
}

export default App;
