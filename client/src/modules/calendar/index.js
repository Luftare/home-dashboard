import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const weekdayIndexToString = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];

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
        const upcomingEvents = data.map(e => {
          const today = new Date();
          const date = new Date(e.start.dateTime);
          const dayOfMonth = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const eventDayMidnightTime = date.getTime() - date.getSeconds() * 1000 - date.getMinutes() * 60 * 1000 - date.getHours() * 60 * 60 * 1000;
          const daysLeft = Math.ceil((eventDayMidnightTime - today.getTime()) / 1000 / 60 / 60 / 24);
          const weekDayName = weekdayIndexToString[date.getDay()];

          return {
            dayOfMonth,
            month,
            year,
            daysLeft,
            weekDayName,
            summary: e.summary,
            description: e.description,
          };
        });

        this.setState({ upcomingEvents: upcomingEvents });
      });
  }

  render() {

    const eventsToday = this.state.upcomingEvents.filter(e => e.daysLeft === 0);
    const eventsTomorrow = this.state.upcomingEvents.filter(e => e.daysLeft === 1);

    return (
      <Container>
        {this.state.upcomingEvents.map((e, i) => (
          <div key={i}>{e.summary}, {e.weekDayName} {e.dayOfMonth}.{e.month} ({e.daysLeft} päivää)</div>
        ))}
      </Container>
    )
  }
}