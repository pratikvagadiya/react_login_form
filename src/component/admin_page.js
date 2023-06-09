import React, { Component } from 'react'
import { NavLink, Navigate } from "react-router-dom";

class AllData extends Component {

    constructor(props) {
        super(props);
        this.state = { email: "", users: [], redirect: false, login: false, role: '' }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            this.handleUpdate();
        } else {
            this.setState({ login: true })
        }
    }

    handleUpdate() {
        let userdata = JSON.parse(localStorage.getItem('users'))
        let role = this.props && this.props.location && this.props.location.state && this.props.location.state.role;
        this.setState({ role: role })
        if (role === "admin") {
            this.setState({ users: userdata.filter((userdata) => userdata.role === "user") })
        } else {
            this.setState({ users: userdata.filter((userdata) => userdata.role !== "super-admin") })
        }
    }

    handleRemoveItems() {
        localStorage.removeItem('token');
    }

    // Delete function

    handleDelete(email) {
        let alldelete = JSON.parse(localStorage.getItem("users"));
        if (alldelete) {
            let data = alldelete.filter((item) => item.email !== email);
            localStorage.setItem("users", JSON.stringify(data));
            this.handleUpdate();
        }
    }

    render() {
        return (
            <div>
                <h1>User data table</h1>
                <ul className="navbar">
                    <li><NavLink onClick={this.handleRemoveItems} to="/login">Logout</NavLink></li>
                </ul>

                <table>
                    <tbody className='tableslice'>
                        <tr className='theading'>
                            <td>Role</td>
                            <td>FirstName</td>
                            <td>LastName</td>
                            <td>Email</td>
                            <td>Action</td>
                        </tr>
                        {
                            this.state.users.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.role}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button onClick={() => { this.setState({ redirect: true, emails: item.email }) }}
                                                className='btn_edit'>Edit
                                            </button>
                                            {this.state.redirect ? <Navigate to="/edit" state={this.state} /> : null}
                                            <button onClick={() => { this.handleDelete(item.email) }}
                                                className='btn_delete'>Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {this.state.login ? <Navigate to="/login" /> : null}
            </div>
        )
    }
}
export default AllData;