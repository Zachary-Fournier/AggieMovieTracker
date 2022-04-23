import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default function LoginPage() {
    let navigate = useNavigate() 
    const registerRoute = () => {
        navigate('/register');
    }
    
    return (
        <div>
           <h1>Login to Aggie Movie Tracker</h1>
           <Form>
               <FormGroup>
                   <Label for='Username'>
                       Username
                   </Label>
                   <Input
                       placeholder='Enter username'
                       type='username'
                    />
               </FormGroup>
               <FormGroup>
                   <Label for='Password'>
                       Password
                   </Label>
                   <Input
                       placeholder='Enter password'
                       type='password'
                    />
               </FormGroup>
               <Button>
                   Login
               </Button>
               <Button onClick={registerRoute}>
                   Click here to register
               </Button>
           </Form>
        </div>
    )
}