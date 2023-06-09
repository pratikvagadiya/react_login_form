import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Edit = () => {
    let navigate = useNavigate();
    const navToPage = (url) => {
        navigate(url)
    }
    const location = useLocation();
    const getmail = location.state;
    const [values, setValues] = useState({})
    let userdata = JSON.parse(localStorage.getItem('users'));

    useEffect(() => {
        showtable();
    }, [])

    const showtable = (e) => {
        let loginUser = userdata.filter((i) => i.email === getmail)
        let userobj = {
            fname: loginUser[0].firstname,
            lname: loginUser[0].lastname,
            email: loginUser[0].email,
            psw: loginUser[0].password
        }
        setValues(userobj)
    }

    const savechange = () => {
        let editobj = values;
        if (editobj.email === getmail) {
            const newdata = {
                ...values,
                // firstname,
                // lastname,
                // email,
                // password
            }
            localStorage.setItem('users', JSON.stringify(newdata))
        }
        console.log(editobj);

        navToPage('/user_profile')
    }
    const cancelchange = () => {
        navToPage("/user_profile")
        console.log(values);
    }
    return (
        <div className="form">
            <h1>Edit Page</h1>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>FirstName </label>
                            </td>
                            <td>
                                <input type="text"
                                    value={values.fname}
                                    onChange={(e) => setValues({ ...values, fname: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>LastName </label>
                            </td>
                            <td>
                                <input type="text"
                                    value={values.lname}
                                    onChange={(e) => setValues({ ...values, lname: e.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Email </label>
                            </td>
                            <td>
                                <input type="text"
                                    value={values.email}
                                    disabled />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Password </label>
                            </td>
                            <td>
                                <input type="text"
                                    value={values.psw}
                                    onChange={(e) => setValues({ ...values, psw: e.target.value })} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="child_div">
                <button onClick={savechange}>Save</button>
                <button onClick={cancelchange}>Cancel</button>
            </div>
        </div>
    )
}
export default Edit;
