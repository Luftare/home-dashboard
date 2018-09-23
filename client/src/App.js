import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  color: white;
`;

const Header = styled.h1`
  margin: 0;
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
        <Module>Jee!</Module>
        <Module>Jee!</Module>
        <Module>Jee!</Module>
        <Module>Jee!</Module>
      </Container>
    );
  }
}

export default App;
