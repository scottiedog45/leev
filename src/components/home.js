import React from 'react';


export default function Home(props) {
    return (
      <div className="home-page">
        <h2>Welcome to Leev</h2>
        <button onClick={e => this.goToPersonnel(e)}>Personnel</button>
        <button onClick={e => this.goToServices(e)}>Services</button>
      </div>
    );
}
