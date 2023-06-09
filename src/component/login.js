import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [data, setData] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    function handleEmail(e) {
        let email = e.target.value;
        setData({ ...data, email })
    }
    function handlePassword(e) {
        let password = e.target.value;
        setData({ ...data, password })
    }
    function handleLogin() {
        if (data.email === "" || data.password === "") {
            alert("Enter Your Email or Password")
            return false
        }
        let Userdata = JSON.parse(localStorage.getItem('users'));
        let statusCheck = Userdata.filter((item) => item.email === data.email)
        if (statusCheck[0].status === true) {
            let login = false, role, emails;
            for (let i = 0; i < Userdata.length; i++) {
                const element = Userdata[i];
                const email = element.email;
                const password = element.password;
                if (data.email === email && data.password === password) {
                    login = true
                    role = element.role
                    emails = email
                    break;
                }
                else {
                    login = false
                }

            }
            if (login) {
                if (role === "user") {
                    navigate("/user", { state: { emails: emails } })
                }
                else {
                    if (role === 'admin') {
                        navigate("/admin_page", { state: { role: role } })
                    }
                    else {
                        navigate('/super-admin', { state: { role: role } })
                    }
                }
                localStorage.setItem('token', "abcd")
            }
            else alert('Please enter valid email or password')
        } else alert('You are Disactive')
    }
    return (
        <div className="formapp, form user-table">
            <h1>Log In Form</h1>
            <div className="form_field ">
                <label htmlFor="email"><i class="fas fa-at"></i> email:</label>
                <input type="text"
                    className="user-input"
                    id="email"
                    value={data.email}
                    placeholder="enter email"
                    onChange={handleEmail}
                />
            </div>
            <div className="form_field">
                <label htmlFor="password"><i class="fas fa-lock"></i> Password:</label>
                <input type="password"
                    className="user-input"
                    id="password"
                    value={data.password}
                    placeholder="enter password"
                    onChange={handlePassword}
                />
            </div>
            <div className="form_field form_btn">
                <button onClick={handleLogin}>Log in</button>
                <button onClick={() => navigate("/")} >Register</button>
            </div>
        </div>
    )
}
export default Login;