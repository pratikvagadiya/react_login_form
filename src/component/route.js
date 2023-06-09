import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import User from "./user";
import AllData from "./admin_page";

const RouterPage = () => {
    const location = useLocation();
    return (
        <Routes >
            <Route path="/" exact={true} element={<Register />} />
            <Route path="/login" exact={true} element={<Login />} />
            <Route path="/user" exact={true} element={<User />} />
            <Route path="/admin_page" exact={true} element={<AllData location={location} />} />
            <Route path="/edit" exact={true} element={<Register />} />
            <Route path="/super-admin" exact={true} element={<AllData />} />
        </Routes>
    )
}
export default RouterPage;