import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: white;
`;

const Header = styled.h1`
  margin: 0;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Header>Jee!</Header>
      </Container>
    );
  }
}

export default App;
