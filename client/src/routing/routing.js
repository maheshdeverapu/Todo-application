import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../athentication-pages/login-page";
import Signup from "../athentication-pages/signup-page";
import HomeScreen from "../screens/homeSreen";

const Router =()=>{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/signup"} element={<Signup/>}/>
                    <Route path={"/home"} element={<HomeScreen/>}/>

                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Router;
