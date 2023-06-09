import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const getmail = location.state && location.state.emails;
    const loginrole = location.state && location.state.role;
    const [values, setValues] = useState({ role: "user", firstname: "", lastname: "", email: "", password: "", status: true })
    const [error, setError] = useState({ fname: false, lname: false, email: false, password: false })
    const nameCheck = /^[a-zA-Z ]+$/;
    const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/;
    const role = ['user', 'admin', 'super-admin']

    useEffect(() => {
        if (getmail) {
            showtable();
        }
    }, [])

    useEffect(() => {
        errorCheck();
    }, [values])

    const showtable = () => {
        let uservalue = JSON.parse(localStorage.getItem('users'));
        let loginUser = uservalue.filter((data) => data.email === getmail)
        let userobj = {
            role: loginUser[0].role,
            firstname: loginUser[0].firstname,
            lastname: loginUser[0].lastname,
            email: loginUser[0].email,
            password: loginUser[0].password
        }
        setValues(userobj)
    }

    const changePage = () => {
        if (getmail) {
            navigate('/admin_page', { state: { role: loginrole } })
        }
        else {
            navigate('/login')
        }
    }

    const errorCheck = () => {
        if (values.firstname) {
            if (nameCheck.test(values.firstname)) {
                setError((error) => ({ ...error, fname: false }))
            }
            else {
                setError((error) => ({ ...error, fname: true }))
            }
        }

        if (values.lastname) {
            if (nameCheck.test(values.lastname)) {
                setError((error) => ({ ...error, lname: false }))
            }
            else {
                setError((error) => ({ ...error, lname: true }))
            }
        }

        if (values.email) {
            if (emailCheck.test(values.email)) {
                setError((error) => ({ ...error, email: false }))
            }
            else {
                setError((error) => ({ ...error, email: true }))
            }
        }

        if (values.password) {
            if (values.password.length > 5) {
                setError((error) => ({ ...error, password: false }))
            }
            else {
                setError((error) => ({ ...error, password: true }))
            }
        }

    }

    function handleSubmit() {

        if (getmail) {
            const editUserData = values;
            const allData = JSON.parse(localStorage.getItem('users'))
            let checkData = allData.findIndex((item) => item.email === editUserData.email)
            allData[checkData] = editUserData;
            localStorage.setItem('users', JSON.stringify(allData));
            navigate('/admin_page', { state: { role: loginrole } })
        }
        else {
            let user = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];
            if (values.firstname === "" || values.lastname === "" || values.email === "" || values.password === "") {
                alert("please fill the data")
            }
            else {
                let errors = user.filter((user) => user.email === values.email);
                if (errors.length > 0) {
                    alert("your email is already registered");
                    return false;
                }
                else {
                    user.push({
                        role: values.role,
                        firstname: values.firstname,
                        lastname: values.lastname,
                        email: values.email,
                        status: values.status,
                        password: values.password
                    })
                    localStorage.setItem('users', JSON.stringify(user));
                    navigate("/login")
                }
            }

        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="formapp, form user-table">
                    <h1>{getmail ? "Edit Data" : "Create Account"}</h1>

                    <div className="role">
                        <label htmlFor="role">Role: </label>

                        <select
                            id="role"
                            onChange={(e) => setValues({ ...values, role: e.target.value })}
                            value={values.role}
                        >
                            <option>{role[0]}</option>
                            <option>{role[1]}</option>
                            <option>{role[2]}</option>
                        </select>
                    </div>

                    <div className="name">
                        <div className="name_row">
                            <div className="form_field">
                                <label htmlFor="firstname">FirstName:</label>
                                <input
                                    className="user-input"
                                    type="text"
                                    id="fisrtname"
                                    value={values.firstname}
                                    placeholder="enter first name"
                                    onChange={(e) => setValues({ ...values, firstname: e.target.value })}
                                />
                                {error.fname ? <p>firstname not valid**</p> : ""}
                            </div>
                        </div>

                        <div className="name_row">
                            <div className="form_field">
                                <label htmlFor="lastname">LastName:</label>
                                <input
                                    className="user-input"
                                    type="text"
                                    id="lastname"
                                    value={values.lastname}
                                    placeholder="enter last name"
                                    onChange={(e) => setValues({ ...values, lastname: e.target.value })}
                                />
                                {error.lname ? <p>lastname not valid**</p> : ""}
                            </div>
                        </div>
                    </div>

                    <div className="form_field">
                        <label htmlFor="email">Email:</label>
                        <input
                            className="user-input"
                            type="text"
                            id="email"
                            disabled={getmail}
                            value={values.email}
                            placeholder="enter email"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                        {error.email ? <p>email not valid**</p> : ""}
                    </div>

                    <div className="form_field">
                        <label htmlFor="password">Password:</label>
                        <input
                            className="user-input"
                            type="password"
                            id="password"
                            value={values.password}
                            placeholder="enter password"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                        />
                        {error.password ? <p>Minimum six character*</p> : ""}
                    </div>
                    {getmail ?
                        <div className='status_btn'>
                            Status:
                            <input
                                type='radio'
                                value={true} name={values.email}
                                onChange={(e) => setValues({ ...values, status: e.target.value })}
                            />
                            <label> True</label>
                            <input
                                type='radio'
                                value={false} name={values.email}
                                onChange={(e) => setValues({ ...values, status: e.target.value })}
                            />
                            <label>False</label>
                        </div> : null
                    }

                    <div className="form_field form_btn">
                        <button type="submit">{getmail ? "Save" : "Register"}</button>
                        <button onClick={changePage} >{getmail ? "Cancel" : "Login"}</button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default Register;