import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ForgotPass = () => {
    
    const [formData, setFormData] = useState({
        email: '', 
        schoolName: '', 
        newPassword: '', 
        conPassword: ''
    })

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:4000/api/auth/updatePassword', formData)
            setSuccess('Password Changed!');
            console.log(response.data)
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

    return (
        <>
            <h3>Forgot Password</h3>
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
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="First School Name"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        name="conPassword"
                        value={formData.conPassword}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Confirm Password"
                    />
                    <input type="submit" className="btn btn-dark" /><br />
                    <Link to={'/login'}>Login </Link>
                    <Link to={'/register'}>SignUp</Link>
                </form>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
            </div>
        </>
    )
}

export default ForgotPass