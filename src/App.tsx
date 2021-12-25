import React from 'react';
import 'App.css';
import { Row } from 'components/Row';
import { requests } from 'request.js';
import { Banner } from 'components/Banner';

function App() {
  return (
    <div className="App">
      <Banner />
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.feachNetflixOriginals} isLargeRow />
      <Row title="Action Movies" fetchUrl={requests.feactActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.feactComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.feactHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.feactRomanceMovies} />
      <Row title="Document Movies" fetchUrl={requests.feactDocumentMovies} />
    </div>
  );
}

export default App;
