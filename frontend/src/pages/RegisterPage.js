import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button, Alert } from 'reactstrap';
import { addUser } from '../Utilities';

export default function RegisterPage() {

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [isAccountCreated, setIsAccountCreated] = useState(false);

    async function registerUser() {
        // let result = await addUser(userName, password);
        // if(result.response === 'Success') {
        //     setIsAccountCreated(true);
        // } else {
        //     setIsAccountCreated(false);
        // }
    }

    return (
        <div>
            <h1>Create an account</h1>
            <Form>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for='Username'>
                                Username
                            </Label>
                            <Input
                                placeholder='Enter username'
                                value={userName}
                                onChange={(e) => {setUserName(e.target.value);}}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for='Password'>
                                Password
                            </Label>
                            <Input
                                placeholder='Enter password'
                                type='password'
                                value={password}
                                onChange={(e) => {setPassword(e.target.value);}}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button onClick={registerUser}>
                   Register
               </Button>
            </Form>
            {isAccountCreated ?
                <Alert>Account '{userName}' was created successfully! <a href="/login">Click here to login!</a></Alert>
                :
                <Alert color='emergency'>There was an error registering</Alert>
            }
        </div>
    )
}