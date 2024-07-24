import { useEffect, useState } from 'react'
import axios from 'axios'

const UpdateProfile = () => {

    const [userDetails, setUserDetails] = useState({
        FirstName: '',
        LastName: '',
        SchoolName: '',
        Email: ''
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        schoolName: '',
        email: ''
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // get Profile

    useEffect(() => { 
        const getProfile = async () => {
            const token = localStorage.getItem('Token')
            try {
                const response = await axios.get('http://localhost:4000/api/auth/getProfile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const { _id, firstName, lastName, schoolName, email } = response.data;
                setUserDetails({ 
                    FirstName: firstName, LastName: lastName, SchoolName: schoolName, Email: email 
                });
                setFormData({
                    firstName, lastName, schoolName
                })
            }
            catch (error) {
                console.log(error)
            }
        }

        getProfile()
    }, [])

    // Update Profile

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post('http://localhost:4000/api/auth/updateProfile', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setSuccess('Profile has been Updated');
            setError('')
        } 
        catch (err) {
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
            <h2>User Profile</h2>
            <div className="container" style={{textAlign: "left", width: "1200px"}}>
                <div className="row">
                    <div className="col-md-5">
                        <h3>User Details</h3>
                        <p><b>First Name:</b>{userDetails.FirstName}</p>
                        <p><b>Last Name: </b>{userDetails.LastName}</p>
                        <p><b>Email: </b>{userDetails.Email}</p>
                        <p><b>First School Name: </b>{userDetails.SchoolName}</p>
                    </div>
                    <div className="col-md-5">
                        <h3>Update Profile</h3>
                        <div className="login-form">
                            <form className="form" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Frist Name"
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
                                    type="text"
                                    name="schoolName"
                                    value={formData.schoolName}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="First School Name"
                                />
                                <input type="submit" className="btn btn-dark" /><br></br>
                            </form>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 

export default UpdateProfile