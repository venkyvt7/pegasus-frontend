import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Form, CardHeader, CardBody, FormGroup, CardFooter, Button, Label, Input } from 'reactstrap'
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';

const LoginForm = () => {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [specialization, setSpecialization] = useState('');
	const [feesPerSession, setFeesPerSession] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState(0);
	const { token, setToken, googleId, setGoogleId } = useContext(AuthContext);
	const history = useHistory();

	async function signup() {
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/doctors/add/`, {
					name, username, phoneNumber, specialization, feesPerSession, password
				}
			);
			setStatus(res.status);

			const token = res.data.token;

			if (res.status === 201) {
				window.localStorage.setItem("token", token);
				window.localStorage.setItem("user", JSON.stringify(res.data.doctor));
				// Remove the googleId if it exisits in the local storage
				window.localStorage.removeItem("googleId");
				setGoogleId(null);
				setToken(token);
				history.push('/doctor');
			}
		} catch (err) {
			console.log(err);
		}
	}

	if (token && !googleId) {
		return <Redirect to="/doctor" />
	}
	return (
		<Container className='text-center'>
			<Row>
				<Col md={8} className='offset-lg-3 mt-5 '>
					<Card>
						<Form>
							<CardHeader className=''>Signup as a Doctor</CardHeader>
							<CardBody >
								<FormGroup row>
									<Label for='Full Name' sm={3}>
										Full Name
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='name'
											id='name'
											placeholder='Enter Full Name'
											onChange={(e) => setName(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='username' sm={3}>
										Username
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='username'
											id='username'
											placeholder='Enter username'
											onChange={(e) => setUsername(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='phoneNumber' sm={3}>
										Phone Number
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='phoneNumber'
											id='username'
											placeholder='Enter Phone Number'
											onChange={(e) => setPhoneNumber(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='specialization' sm={3}>
										Specialization
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='specialization'
											id='specialization'
											placeholder='Enter Specialization'
											onChange={(e) => setSpecialization(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='feesPerSession' sm={3}>
										Fees Per Session
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='feesPerSession'
											id='feesPerSession'
											placeholder='Enter Fees Per Session'
											onChange={(e) => setFeesPerSession(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='password' sm={3}>
										Password
									</Label>
									<Col sm={9}>
										<Input
											type='password'
											name='password'
											id='password'
											placeholder='Enter Password'
											onChange={(e) => setPassword(e.target.value)}
											onKeyPress={(target) => {
												if (target.charCode == 13) {
													signup();
												}
											}}
										/>
									</Col>
								</FormGroup>
								{status === 201 && <p className="warning" style={{ color: "red", fontSize: "15px" }}>Wrong username or password! Please try again</p>}
							</CardBody>
							<CardFooter>
								<Button block color="primary" onClick={signup}>
									Sign Up
								</Button>
							</CardFooter>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default LoginForm;