import { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import client from './config/apollo';
import Auth from './pages/Auth';

import AuthContext from './context/AuthContext';
import { getToken, removerToken } from './utils/token';

//componentes
import Navigation from './router/Navigation';
import tokenreal from './utils/revelartoken';




function App() {

  const [auth, setAuth] = useState(undefined)


  useEffect(() => {

    const token = getToken();
    
    if (!token) {
      setAuth(null)
    } else {
      setAuth(tokenreal(token))
    }

  },[])


  const logout = () => {

    removerToken()
    setAuth(null)

  }

  //useMemo compara los datos viejos con los nuevos y cualquier cambio lo actualiza pero si no hay cambios evitamos que nuestro
  //componenete se vuelva a recargar

  const setUser = (user) => {

    setAuth(user)

  }

  const authData = useMemo(
    () => (
      {
        auth,
        logout,
        setUser
      }), [auth]);

      if(auth === undefined){
        return null
      }




  return (

    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation/>}
        <ToastContainer

          position='top-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>

    </ApolloProvider>
  )
}

export default App
