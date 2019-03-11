import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-left: 64px;
  padding-top: 64px;
`;
const EventGroup = styled.div`
  h3 {
    font-size: 42px;
    margin: 42px 0;
  }
`;
const EventItem = styled.div`
  margin-left: 32px;
  margin-top: 10px;

  h4 {
    font-size: 28px;
    margin: 0;
    margin-right: 12px;
  }
`;

const weekdayIndexToString = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingEvents: [],
    };
  }

  componentDidMount() {
    const hour = 1000 * 60 * 60;

    this.updateCalendarState();

    setInterval(() => {
      this.updateCalendarState();
    }, hour);
  }

  updateCalendarState() {
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
          const hours = date.getHours();
          const minutes = date.getMinutes();

          return {
            dayOfMonth,
            month,
            year,
            daysLeft,
            weekDayName,
            hours,
            minutes,
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
    const laterEvents = this.state.upcomingEvents.filter(e => e.daysLeft > 1);

    const eventToDetails = (e, i) => (
      <EventItem key={i}><h4>{e.summary}</h4> klo {e.hours}.{e.minutes}</EventItem>
    );

    const eventToOverview = (e, i) => (
      <EventItem key={i}><h4>{e.summary}</h4> {e.weekDayName} {e.dayOfMonth}.{e.month} klo  {e.hours}.{e.minutes} ({e.daysLeft} päivää)</EventItem>
    );

    return (
      <Container>
        <EventGroup>
          <h3>Tänään</h3>
          {eventsToday.map(eventToDetails)}
        </EventGroup>
        <EventGroup>
          <h3>Huomenna</h3>
          {eventsTomorrow.map(eventToDetails)}
        </EventGroup>
        <EventGroup>
          <h3>Myöhemmin</h3>
          {laterEvents.map(eventToOverview)}
        </EventGroup>
      </Container>
    )
  }
}