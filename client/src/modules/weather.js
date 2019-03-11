import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const Forecast = styled.span`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecasts: []
    };
  }

  componentDidMount() {
    const hour = 1000 * 60 * 60;

    this.updateForecast();

    setInterval(() => {
      this.updateForecast();
    }, hour);
  }

  updateForecast() {
    fetch('http://127.0.0.1:9999/weather')
      .then(data => data.json())
      .then(forecasts => {
        this.setState({ forecasts });
      });
  }

  render() {
    const firstForecast = this.state.forecasts[0];
    const middleForecast = this.state.forecasts[
      Math.round(this.state.forecasts.length / 2)
    ];
    const lastForecast = this.state.forecasts[this.state.forecasts.length - 1];

    return (
      <div {...this.props}>
        <Container>
          {this.state.forecasts.map((forecast, i) => (
            <Forecast key={i}>{forecast.temperature}</Forecast>
          ))}
        </Container>
        <Container>
          {firstForecast && <Forecast>{firstForecast.time}:00</Forecast>}
          {middleForecast && <Forecast>{middleForecast.time}:00</Forecast>}
          {lastForecast && <Forecast>{lastForecast.time}:00</Forecast>}
        </Container>
      </div>
    );
  }
}
