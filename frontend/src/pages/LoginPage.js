import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { getUserInfo, getUserPass } from '../Utilities';

export default function LoginPage() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [isValidPassword, setIsValidPassword] = useState(true);
    let navigate = useNavigate(); 
    const registerRoute = () => {
        navigate('/register');
    }
    
    /**
     * this function will check if the password given on the 
     * login page is accurate for the given username
     * written by Mark Treviño
     */
    async function loginUser() {
        let result = await getUserPass(userName);
        if(result.password[0][0] === password) {
            // put user info into local storage
            let userInfo = await getUserInfo(userName);

            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            navigate('/');
            window.location.reload();
        } else {
            setIsValidPassword(false);
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
            <Alert color='danger'>Please enter in a valid username/password combination!</Alert>
           }
        </div>
    )
}