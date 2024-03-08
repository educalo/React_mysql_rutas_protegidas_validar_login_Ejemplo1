import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState("");
    const [userExists, setUserExists] = useState(false); 
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        //console.log("paso1: " + userExists);
        if (userExists) {
            navigate('/About');
        }
    }, [userExists]); 

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user })
        };

        fetch('http://localhost:3000/login', requestOptions)
            .then(response => response.json())
            .then(response => {
                setUserExists(response);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [user]); 

    const onSubmit = (data) => {
        setUser(data.email);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label>Email</label>
                <input id="form_email" type="text" className="form-control" {...register('email')} />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input id="form_password" type="password" className="form-control" {...register('password')} />
            </div>
            <input type="submit" value="Enviar" />
            {userExists === false && <p>Usuario no reconocido</p>}
        </form>
    );
}

export default Login;