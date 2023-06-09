import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";


const User = () => {
    let token = localStorage.getItem('token')
    const navigate = useNavigate();
    const location = useLocation();
    const getmail = location.state.emails;
    const userdata = JSON.parse(localStorage.getItem('users'))

    const [values, setValues] = useState({ fname: '', lname: '', email: '', password: '' })
    useEffect(() => {
        if (!token) {
            // handleLoginUser()
            navigate('/login')
        }
    }, [])


    const handleLogout = () => {
        localStorage.removeItem('token');
        setValues({ ...values, active: false })
    }
    return (
        <div>
            <h1>User Profile</h1>
            <ul className="navbar">
                <li><NavLink onClick={handleLogout} to="/login">Logout</NavLink></li>
            </ul>

            <table>
                <tbody className='user-table'>
                    {
                        userdata.map((item, i) => {
                            if (getmail === item.email) {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <lable><td>FirstName</td></lable>
                                        </td>
                                        <td>
                                            <input className="user-input" type='text' value={item.firstname} />
                                        </td>
                                        <td>
                                            <lable><td>LastName</td></lable>
                                        </td>
                                        <td>
                                            <input className="user-input" type='text' value={item.lastname} />
                                        </td>
                                        <td>
                                            <lable><td>Email</td></lable>
                                        </td>
                                        <td>
                                            <input className="user-input" type='text' value={item.email} />
                                        </td>
                                        <td>
                                            <lable><td>Password</td></lable>
                                        </td>
                                        <td>
                                            <input className="user-input" type='text' value={item.password} />
                                        </td>
                                    </tr>
                                )
                            }
                        })

                    }
                </tbody>
            </table>
        </div>
    )
}

export default User;