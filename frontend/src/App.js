import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';
import CarouselComp from './components/carouselcomponent';
import Header from './components/headercomponent';
import Home from './components/homecomponent';
import About from './components/aboutuscomponent';
import Students from './components/studentscomponent';
import Employees from './components/employeescomponent';
import Rooms from './components/roomscomponent';
import Messes from './components/messescomponent';
import Footer from './components/footercomponent';
import StudentDetail from './components/studentdetailcomponent';
import EmployeeDetail from './components/employeedetailcomponent';
import RoomDetail from './components/roomdetailcomponent';
import MessDetail from './components/messdetailcomponent';
import Editstudent from './components/editstudentcomponent';
import Editemployee from './components/editemployeecomponent';
import Editmess from './components/editmesscomponent';
import Login from './components/logincomponent';
import Profile from './components/profilecomponent';

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
          <Route path="/students/:id" component={StudentDetail} exact/>
          <Route path="/employees" component={Employees} exact/>
          <Route path="/employees/:id" component={EmployeeDetail} exact/>
          <Route path="/rooms" component={Rooms} exact/>
          <Route path="/rooms/:id" component={RoomDetail} />
          <Route path="/mess" component={Messes} exact/>
          <Route path="/mess/:id" component={MessDetail} exact/>
          <Route path="/login" component={Login}/>
          <Route path="/profile" component={Profile} />
          <Route path="/students/:id/edit" component={Editstudent} />
          <Route path="/employees/:id/edit" component={Editemployee} />
          <Route path="/mess/:id/edit" component={Editmess} />
        </Container>
      </main>      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
