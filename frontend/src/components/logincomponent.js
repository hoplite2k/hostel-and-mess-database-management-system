import React, {useEffect, useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; 
import Loader from '../components/loadercomponent';
import Message from '../components/messagecomponent';
import { login } from '../actions/useractions';
import FormContainer from '../components/formcontainercomponent';

const Login = (props) => {
    const [id, setid] = useState('');
    const [password, setpassword] = useState('');

    const dispatch = useDispatch();

    const redirect = props.location.serach ? props.location.search.split('=')[1] : '/';

    const userlogin = useSelector((state) => state.userlogin);
    const {loading, error, userinfo} = userlogin;

    useEffect(() => {
        if(userinfo){
            props.history.push(redirect);
        }
    }, [props.history, userinfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(id, password));
    }

    return(
        <FormContainer>
            <h1>Login</h1>
            <br />
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='id'>
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type='text' placeholder='Enter User ID' value={id} onChange={(e) => setid(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setpassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Login</Button>
            </Form>
        </FormContainer>
    );
}

export default Login;