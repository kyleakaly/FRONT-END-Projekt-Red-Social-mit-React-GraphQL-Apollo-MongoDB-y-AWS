import * as yup from "yup";
import { useState } from "react";
import { EDITAR_PERFIL } from "../../../../gql/user";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Button, Form, Icon } from "semantic-ui-react";
import usercontext from "../../../../hooks/useAuth";


const ContrasenaForm = ({ setShow, history,client }) => {
  const { logout } = usercontext();

  const [error, setError] = useState("");

  const [editarPerfil] = useMutation(EDITAR_PERFIL);

  const formik = useFormik({
    initialValues : {
      password: "",
      nuevopassword: "",
      repetirnuevopassword: "",
    },
    validationSchema: yup.object({
      
      password: yup
        .string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "Tu nombre de usuario no debe contener espacios"
        ).required("la vieja contraseña es necesaria"),
      nuevopassword: yup
        .string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "Tu nombre de usuario no debe contener espacios"
        )
        .required("la nueva contrasena es necesaria")
        .oneOf(
          [yup.ref("repetirnuevopassword")],
          "las contrasenas no son iguales"
        ),
      repetirnuevopassword: yup
        .string()
        .required("Repetir la contrasena es necesaria")
        .oneOf([yup.ref("nuevopassword")], "las contrasenas no son iguales"),
    }),

    onSubmit: async (formdata) => {
      try {
      const result = await editarPerfil({
          variables: {
            input: {
              password: formdata.password,
              nuevopassword: formdata.nuevopassword,
            },
          },
        });
        setShow(false);
        toast.success("felicidades cambiaste tu contrasena vuelve a iniciar sesion");
        if(result){
            onLogout()
            client.cache.reset()
            history('/')
        }
        
      } catch (error) {
        toast.error(error.message);
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    },
  });

  const onLogout = () => {
    client.clearStore();
    logout();
    history("/");
  };

  return (
    <Form onSubmit={formik.handleSubmit} className="editarclase">
      <div className="datospersonales">
        <div className="titulo  titulo2">
          <h2>Editar Contraseña</h2>
        </div>
        <div className="editarpading">
          <label htmlFor="password">Cambiar Contrasena </label>
          <Form.Input
            type="password"
            name="password"
            placeholder="Antigua Contraseña"
            onChange={formik.handleChange}
            error={formik.errors.password && true}
            value={formik.values.password}
          />
          <Icon className="icononame" name="braille" />
          <Form.Input
            type="password"
            name="nuevopassword"
            placeholder="Nueva Contraseña"
            onChange={formik.handleChange}
            error={formik.errors.nuevopassword && true}
            value={formik.values.nuevopassword}
          />
          <Icon className="icononame" name="plus" />
          <Form.Input
            type="password"
            name="repetirnuevopassword"
            placeholder="repetir Contrasena"
            onChange={formik.handleChange}
            error={formik.errors.repetirnuevopassword && true}
            value={formik.values.repetirnuevopassword}
          />
          <Icon className="icononame" name="redo" />
        </div>
      </div>

      <div className="contenedorbotones">
        <Form.Button type="submit"> Guardar Nueva Contraseña</Form.Button>
        {error && (
          <p style="background-color:red;" className="submit-error">
            {error}
          </p>
        )}
        <Button className="colorboton" onClick={() => setShow(false)}>
          {" "}
          Cancelar{" "}
        </Button>
        <Button className="cerrarcesion" onClick={onLogout}>
          Cerrar Seccion
        </Button>
      </div>
    </Form>
  );
};

export default ContrasenaForm;
