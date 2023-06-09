import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

function AllData() {
    const abcd = localStorage.getItem('token')
    const navigate = useNavigate();
    const [state, setState] = useState({ email: "", users: [] })

    useEffect(() => {
        if (abcd) {
            handleUpdate();
        } else {
            navigate("/login")
        }
    }, [])


    const handleUpdate = () => {
        let userdata = JSON.parse(localStorage.getItem('users'))
        setState({ users: userdata.filter((userdata) => userdata.role === "user") })
    }
    const removeItems = () => {
        localStorage.removeItem('token');
    }

    const handleDelete = (email) => {
        let alldelete = JSON.parse(localStorage.getItem("users"));
        if (alldelete) {
            let data = alldelete.filter((item) => item.email !== email);
            localStorage.setItem("users", JSON.stringify(data));
            handleUpdate();
        }
    }

    return (
        <div>
            <h1>User data table</h1>
            <ul className="navbar">
                <li><NavLink onClick={removeItems} to="/login">Logout</NavLink></li>
            </ul>

            <table border="1px">
                <tbody className='tableslice'>
                    <tr className='theading'>
                        <td>Role</td>
                        <td>FirstName</td>
                        <td>LastName</td>
                        <td>Email</td>
                        <td>Active</td>
                        <td>Action</td>
                    </tr>
                    {
                        state.users.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.role}</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.active}</td>
                                    <td>
                                        {/* <NavLink to="/edit" className='btn_edit' state={{ getmail: item.email}}>Edit</NavLink> */}
                                        <button onClick={() => navigate('/edit', { state: { email: item.email } })} className='btn_edit'>Edit</button>
                                        <button onClick={() => handleDelete(item.email)} className='btn_delete'>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default AllData;
