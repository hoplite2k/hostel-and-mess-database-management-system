import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import CarouselComp from './components/carouselcomponent';
import Header from './components/headercomponent';
import Home from './components/homecomponent';
import About from './components/aboutuscomponent';
import Footer from './components/footercomponent';

function App() {
  return (
    <BrowserRouter>
      <CarouselComp />
      <Header/>
      <main className="py-3">
        <Container>
          <Route path="/" component={Home} exact/>
          <Route path="/hostel" component={Home}/>
          <Route path="/aboutus" component={About}/>
        </Container>
      </main>      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
