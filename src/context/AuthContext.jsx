//crearemos un context para que este disponible el estado en todas las paginas de nuestra aplicacion es un tipo de redux mas liviano
//siempre tenemos que crear un hook acompanado del context 

import {createContext} from 'react';

const AuthContext = createContext({
    user : undefined
});

export default AuthContext