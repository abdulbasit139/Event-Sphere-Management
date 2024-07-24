import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value, 
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', formData)
            setSuccess('Login successful!');
            const token = response.data.Token
            localStorage.setItem('Token', token)
            setError('');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
            setSuccess(''); 
        }

    }

    return(
        <>
            <h3>Login</h3>
            <div className="login-form">
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Password"
                    />
                    <input type="submit" className="btn btn-dark" /><br></br>
                    <Link to={'/forgot-password'}>Forgot Password</Link>
                </form>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
            </div>
        </>
    )
}

export default Login