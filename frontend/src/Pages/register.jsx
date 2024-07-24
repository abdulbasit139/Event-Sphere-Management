import { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        schoolName: '',
        gender: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', formData)
            navigate('/login')
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
            setSuccess('');
        }

    };

    return (
        <>
            <h3>Register</h3>
            <div className="register-form">
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Last Name"
                    />
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
                    <input
                        type="text"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="School Name"
                    />
                    <div className="input-group mt-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="genderSelect">Gender</label>
                        </div>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="custom-select form-control"
                            id="genderSelect"
                        >
                            <option value={null}>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="input-group mt-2">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="roleSelect">Role</label>
                        </div>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="custom-select form-control"
                            id="roleSelect"
                        >
                            <option value={null}>Select Role</option>
                            <option value="attendee">Attendee</option>
                            <option value="organizer">Exhibitor</option>
                        </select>
                    </div>
                    <input type="submit" className="btn btn-dark" /><br></br>
                    <Link to={'/login'}>Login </Link>
                    <Link to={'/register'}>SignUp</Link>
                </form>
            </div>
        </>
    );
};

export default Register;
