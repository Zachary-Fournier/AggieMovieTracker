import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';

export default function RegisterPage() {
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
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button>
                   Register
               </Button>
            </Form>
        </div>
    )
}