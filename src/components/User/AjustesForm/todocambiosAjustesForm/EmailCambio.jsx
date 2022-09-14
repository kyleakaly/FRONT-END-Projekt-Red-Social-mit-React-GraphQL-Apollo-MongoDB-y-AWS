import * as yup from "yup";
import { useState } from "react";
import { EDITAR_PERFIL } from "../../../../gql/user";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Form, Icon } from "semantic-ui-react";
import usercontext from "../../../../hooks/useAuth";

const EmailCambio = ({ setShow, history, email,client }) => {

    const {logout} = usercontext()

    const [error,setError] = useState("")

    const [editarPerfil] = useMutation(EDITAR_PERFIL);

    const formik = useFormik({
        initialValues:{
            email : email
        },

        validationSchema : yup.object({
          email: yup.string().email("email no es valido").required("el email es obligatorio"),
        }),

        onSubmit: async (formdata) => {

            try {

                await editarPerfil({

                    variables: {
                        input : {
                            email : formdata.email
                        }
                    }

                });
                setShow(false);
                toast.success("felicidades reiniciaste tu email")
                onLogout()
                
            } catch (error) {
                
                toast.error(error.message);
                setError(error.message)
                setTimeout(() => {
                    setError("")
                }, 4000);

            }

        }

    });

    const onLogout = () => {
        client.clearStore();
        logout()
        client.cache.reset()
        history("/");
       
    }

  return (
    <Form onSubmit={formik.handleSubmit} className="editarclase">
      <div className="datospersonales">
        <div className="titulo  titulo2">
          <h2>Editar Email</h2>
        </div>

        <div className="editarpading">
          <label htmlFor="email">Email: </label>
          <Form.Input
            type="text"
            name="email"
            placeholder="Cambiar email"
            onChange={formik.handleChange}
            error={formik.errors.email && true}
            value={formik.values.email}
          />{" "}
          <Icon className="icononame" name="mail" />
        </div>
        </div>
        <div className="contenedorbotones">
        <Form.Button type="submit"> Guardar Nuevo Email</Form.Button>
        {error && (
          <p style="background-color:red;" className="submit-error">
            {error}
          </p>
        )}
        </div>
       
        </Form>
  )
}

export default EmailCambio