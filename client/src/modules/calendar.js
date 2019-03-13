import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const EventGroup = styled.div`
  h3 {
    font-size: 42px;
    margin: 42px 0;
  }
`;
const EventItem = styled.div`
  margin-left: 32px;
  margin-top: 10px;

  span {
    font-size: 20px;
  }

  h4 {
    font-size: 28px;
    margin: 0;
    margin-right: 12px;

    span {
      font-weight: 400;
      margin-left: 8px;
    }
  }
`;

const weekdayIndexToString = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];

function zeroPad(num) {
  const padded = '0' + num;
  return padded.substr(-2);
}

function durationToText(duration) {
  const hour = 1000 * 60 * 60;

  if (duration < hour * 1.6) {
    return Math.round(duration / 1000 / 60) + ' min';
  }

  return Math.round(duration / 1000 / 60 / 60) + ' h';
}

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingEvents: []
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
          const endDate = new Date(e.end.dateTime);
          const dayOfMonth = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const eventDayMidnightTime =
            date.getTime() -
            date.getSeconds() * 1000 -
            date.getMinutes() * 60 * 1000 -
            date.getHours() * 60 * 60 * 1000;
          const daysLeft = Math.ceil(
            (eventDayMidnightTime - today.getTime()) / 1000 / 60 / 60 / 24
          );
          const weekDayName = weekdayIndexToString[date.getDay()];
          const hours = date.getHours();
          const formattedHours = zeroPad(hours);
          const minutes = date.getMinutes();
          const formattedMinutes = zeroPad(minutes);
          const duration = endDate.getTime() - date.getTime();
          const durationText = durationToText(duration);

          return {
            dayOfMonth,
            month,
            year,
            daysLeft,
            weekDayName,
            hours,
            minutes,
            formattedMinutes,
            formattedHours,
            summary: e.summary,
            duration,
            durationText,
            description: e.description
          };
        });

        this.setState({ upcomingEvents: upcomingEvents });
      });
  }

  render() {
    const eventsToday = this.state.upcomingEvents.filter(e => e.daysLeft === 0);
    const eventsTomorrow = this.state.upcomingEvents.filter(
      e => e.daysLeft === 1
    );
    const laterEvents = this.state.upcomingEvents.filter(e => e.daysLeft > 1);

    const eventToDetails = (e, i) => (
      <EventItem key={i}>
        <h4>{e.summary}</h4>
        <span>
          klo {e.formattedHours}.{e.formattedMinutes}, {e.durationText}
        </span>
      </EventItem>
    );

    const eventToOverview = (e, i) => (
      <EventItem key={i}>
        <h4>{e.summary}</h4>
        <span>
          {e.weekDayName} {e.dayOfMonth}.{e.month} klo {e.formattedHours}.
          {e.formattedMinutes} ({e.daysLeft} päivää)
        </span>
      </EventItem>
    );

    const today = new Date();
    const dayOfMonth = today.getDate();
    const month = today.getMonth() + 1;
    const weekDayName = weekdayIndexToString[today.getDay()];

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowMonth = tomorrow.getMonth() + 1;
    const tomorrowDayOfMonth = tomorrow.getDate();
    const tomorrowWeekDayName = weekdayIndexToString[tomorrow.getDay()];

    return (
      <Container {...this.props}>
        <EventGroup>
          <h3 style={{ marginTop: 0 }}>
            Tänään{' '}
            <span style={{ fontSize: '30px', fontWeight: 500 }}>
              {weekDayName} {dayOfMonth}.{month}.
            </span>
          </h3>
          {eventsToday.map(eventToDetails)}
        </EventGroup>
        <EventGroup>
          <h3>
            Huomenna{' '}
            <span style={{ fontSize: '30px', fontWeight: 500 }}>
              {tomorrowWeekDayName} {tomorrowDayOfMonth}.{tomorrowMonth}.
            </span>
          </h3>
          {eventsTomorrow.map(eventToDetails)}
        </EventGroup>
        <EventGroup>
          <h3>Myöhemmin</h3>
          {laterEvents.map(eventToOverview)}
        </EventGroup>
      </Container>
    );
  }
}
