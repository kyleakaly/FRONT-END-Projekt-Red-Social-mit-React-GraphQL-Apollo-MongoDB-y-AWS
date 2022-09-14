//layouts


// pages
import Home from '../pages/home'
import User from '../pages/User'
import Error404 from '../pages/Error404'

const routes = [

    //ruta Home
    {
        path: "/",
        component : Home,
        exact:true
    },

    //ruta User
    {
         path : "/:username",
         component : User,
        exact: true,
    },

    //Error404
    {
        path : '*',
        component: Error404,

    }
];

export default routes