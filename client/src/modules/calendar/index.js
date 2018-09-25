import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingEvents: [],
    };

  }

  componentDidMount() {
    fetch('http://127.0.0.1:9999/calendar')
      .then(data => data.json())
      .then(data => {
        const upcomingEvents = data.map(e => ({
          time: e.start.dateTime.split(':00+03:00').join('').split('T').join(', '),
          summary: e.summary,
          description: e.description,
        }));

        this.setState({ upcomingEvents: upcomingEvents });
      });
  }

  render() {


    return (
      <Container>
        {this.state.upcomingEvents.map((e, i) => (
          <div key={i}>{e.summary}, {e.time}</div>
        ))}
      </Container>
    )
  }
}