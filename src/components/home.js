import React from 'react';


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      createPerson: false,
      service: 'Dec 12th'
    }
  }

  render() {
    return (
      <div className="home-page">
        <h2>Welcome to Leev</h2>
        <button onClick={e => this.goToPersonnel(e)}>Personnel</button>
        <button onClick={e => this.goToServices(e)}>Services</button>
      </div>
    );
  }
}
