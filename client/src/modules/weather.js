import React, { Component } from 'react';
import styled from 'styled-components';

const Module = styled.div`
  .day-length {
    margin-bottom: 48px;

    * {
      font-size: 24px;
    }

    .bold {
      font-weight: 600;
    }
  }

  table {
    width: 100%;
    margin: 0 -3%;
    border-collapse: separate;
    border-spacing: 0 16px;

    td {
      width: ${(props) =>
        props.forecastCount === 0 ? 1 : Math.floor(100 / props.forecastCount)}%;
      text-align: center;
    }
  }
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
      forecasts: [],
      dayLength: '',
      sunrise: '',
      sunset: '',
      dayLengthDifferenceTomorrow: 0,
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
      .then((data) => data.json())
      .then((weather) => {
        this.setState({
          ...weather
        });
      });
  }

  render() {
    const firstForecast = this.state.forecasts[0];
    const secondForecast = this.state.forecasts[1];
    const middleForecast = this.state.forecasts[
      Math.round(this.state.forecasts.length / 2)
    ];
    const lastForecast = this.state.forecasts[this.state.forecasts.length - 1];
    const secondLastForecast = this.state.forecasts[
      this.state.forecasts.length - 2
    ];
    const hasForecasts = this.state.forecasts.length > 0;

    return (
      <Module forecastCount={this.state.forecasts.length} {...this.props}>
        <div className="day-length">
          <div>
            <span className="bold">{this.state.dayLength},</span> <span>huomenna {`${this.state.dayLengthDifferenceTomorrow < 0 ? '' : '+'}${this.state.dayLengthDifferenceTomorrow}`} min</span>
          </div>
          <div style={{ marginTop: '8px' }}>
            {this.state.sunrise} - {this.state.sunset}
          </div>
        </div>

        <table>
          {hasForecasts && (
            <tr>
              <td>
                <Forecast>{firstForecast.time}</Forecast>
              </td>
              <td />
              <td />
              <td />
              <td />
              <td>
                <Forecast>{middleForecast.time}</Forecast>
              </td>
              <td />
              <td />
              <td />
              <td />
              <td>
                <Forecast>{lastForecast.time}</Forecast>
              </td>
            </tr>
          )}
          <tr>
            {this.state.forecasts.map((forecast, i) => (
              <td key={i}>
                <Forecast>{forecast.temperature}</Forecast>
              </td>
            ))}
          </tr>
          <tr>
            {this.state.forecasts.map((forecast, i) => (
              <td key={i}>
                <Forecast key={i}>{forecast.rainLikelihood}</Forecast>
              </td>
            ))}
          </tr>
          {hasForecasts && (
            <tr>
              <td colspan="4">
                <Forecast style={{ fontWeight: 500 }}>
                  {secondForecast.description}
                </Forecast>
              </td>
              <td colspan="3">
                <Forecast style={{ fontWeight: 500 }}>
                  {middleForecast.description}
                </Forecast>
              </td>
              <td colspan="4">
                <Forecast style={{ fontWeight: 500 }}>
                  {secondLastForecast.description}
                </Forecast>
              </td>
            </tr>
          )}
        </table>
      </Module>
    );
  }
}
