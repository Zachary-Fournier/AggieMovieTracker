import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { getUserPass } from '../Utilities';

export default function LoginPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [isValidPassword, setIsValidPassword] = useState(true);
    let navigate = useNavigate(); 
    const registerRoute = () => {
        navigate('/register');
    }
    
    // loginUser was written by Mark Treviño
    /**
     * this function will check if the password given on the 
     * login page is accurate for the given username
     */
    async function loginUser() {
        let result = await getUserPass(userName);
        if(result.password[0][0] == password) {
            navigate('/profile');
        } else {
            setIsValidPassword(false)
        }

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
                       value={userName}
                       onChange={(e) => {setUserName(e.target.value);}}
                    />
               </FormGroup>
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
               <Button onClick={loginUser}>
                   Login
               </Button>
               <Button onClick={registerRoute}>
                   Click here to register
               </Button>
           </Form>
           {!isValidPassword && 
            <Alert color='emergency'>Please enter in a valid password!</Alert>
           }
        </div>
    )
}