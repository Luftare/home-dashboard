import React, { Component } from 'react';
import styled from 'styled-components';

const Module = styled.div`
  table {
    float: right;

    td {
      font-size: 20px;
      font-weight: 500;
      text-align: left;
      padding-top: 4px;
      padding-left: 12px;
    }
  }
`;

function secondsToTimeString(seconds) {
  if (seconds < 0) {
    return '';
  }
  if (seconds < 60) {
    return '+' + seconds + ' s';
  }
  return '+' + Math.floor(seconds / 60) + ' min';
}

export default class Transportation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transportations: []
    };
  }

  componentDidMount() {
    const updateInterval = 1000 * 60;

    this.updateTransportations();

    setInterval(() => {
      this.updateTransportations();
    }, updateInterval);
  }

  updateTransportations() {
    fetch('http://127.0.0.1:9999/transportation')
      .then(data => data.json())
      .then(transportations => {
        this.setState({ transportations });
      });
  }

  render() {
    return (
      <Module {...this.props}>
        <table>
          <tr>
            <td colSpan="4">
              <h3
                style={{ fontSize: '42px', marginBottom: '42px', marginTop: 0 }}
              >
                Seuraavat bussit
              </h3>
            </td>
          </tr>
          {this.state.transportations.map((entry, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 700 }}>{entry.bussNumber}</td>
              <td>{entry.scheduledArrivalText}</td>
              <td>
                {entry.delayInSeconds === 0
                  ? ''
                  : secondsToTimeString(entry.delayInSeconds)}
              </td>
              <td>{entry.destination}</td>
            </tr>
          ))}
        </table>
      </Module>
    );
  }
}
