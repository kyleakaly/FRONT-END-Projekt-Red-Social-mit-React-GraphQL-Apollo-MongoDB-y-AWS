import React from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'

import LayoutBasic from '../layout/LayoutBasic';



//Creados por mia
import routes from "./routes";

const Navigation = () => {

    return(

        <Router>

        <Routes>

        <Route element={(<LayoutBasic/>)}>
        {routes.map((route,index) => (

           
                <Route
                
                key={index}
                path={route.path}
                exact={route.exact}
                element = {(<route.component/>)}
                />

             

            ))}
            </Route>

        </Routes>

        </Router>
    )

}

export default Navigation;