import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";

import './Register.css'


function Register() {
    const [user, setUser] = useState({})
    const [doNotMatch, setDoNotMatch] = useState('')
    const { name, email, password, password2 } = user
    const navigate = useNavigate()

    function checkPostData() {
        const emailChar = ['@', '.']

        if (password !== password2) {
            setDoNotMatch('Password do not match, please try again');
        } else if (password.length < 7) {
            setDoNotMatch('Password is to short, please try again')
        } else if (!password.match(/[0-9]/)) {
            setDoNotMatch('Password should includes at least one number, please try again')
        }else if (!emailChar.every(element => email.includes(element))) {
            setDoNotMatch('Your emial is incorrect, please try again')
        } else {
            setDoNotMatch('Thank you for your registration')
            setUser(user)    
        }
    }

    const submitUser = async (e) => {
        e.preventDefault();
        checkPostData()
        const response = await fetch(`http://localhost:8000/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            console.log('Register user')
            navigate('/login')
        } else {
            console.log('Failed register')
        }
    }


    return (
        <div className='register-body'>
            <section className='register'>

                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
                <h1>Register</h1>
                <p>Please create an account</p>
            </section>
            <h3>{doNotMatch}</h3>
            <hr style={{width: "80%"}}/>
            <section className='form-register'>
                <form onSubmit={submitUser} className='form-register'>
                    <input
                        text="text"
                        placeholder='Enter your name'
                        id="name"
                        name='name'
                        value={name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                    <input
                        text="text"
                        placeholder='Enter your e-mail'
                        id="email"
                        name='email'
                        value={email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <input
                        type='password'
                        text="text"
                        placeholder='Enter password'
                        id="password"
                        name='password'
                        value={password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <input
                        type='password'
                        text="text"
                        placeholder='Confirm password'
                        id="password2"
                        name='password2'
                        value={password2}
                        onChange={(e) => setUser({ ...user, password2: e.target.value })}
                    />
                    <Button type='submit' variant="primary" size="lg" active>Register</Button>
                </form>
            </section>
        </div>
    )
}

export default Register;