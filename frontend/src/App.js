import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import CarouselComp from './components/carouselcomponent';
import Header from './components/headercomponent';
import Home from './components/homecomponent';
import About from './components/aboutuscomponent';
import Students from './components/studentscomponent';
import Employees from './components/employeescomponent';
import Footer from './components/footercomponent';
import StudentDetail from './components/studentdetailcomponent';
import EmployeeDetail from './components/employeedetailcomponent';

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
          <Route path="/students" component={Students} exact/>
          <Route path="/students/:id" component={StudentDetail} />
          <Route path="/employees" component={Employees} exact/>
          <Route path="/employees/:id" component={EmployeeDetail} />
        </Container>
      </main>      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
