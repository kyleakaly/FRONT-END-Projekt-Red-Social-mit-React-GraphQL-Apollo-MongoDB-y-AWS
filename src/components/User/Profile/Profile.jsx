import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";

//css
import { Grid, Image } from "semantic-ui-react";

//archivos
import "./Profile.scss";
import ImagenNoFound from "../../../assets/img/avatar.png";
import { GridColumn } from "semantic-ui-react";

//componentes
import UserNoFounf from "../../UserNoFound/index";
import ModalBasic from "../../Modal/ModalBasic/index";
import AvatarForm from "../AvatarForm/index";
import usercontext from "../../../hooks/useAuth"
import HeaderProfile from '../Profile/HeaderProfile'
import AjustesForm from "../AjustesForm/AjustesForm";
import Follower from "../Followers/Followers";


const Profile = ({ username, id }) => {

  const { auth } = usercontext();

  const nombreDeUsuario = auth.username


  const [show, setShow] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setchildrenModal] = useState(null);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      username: username,
      id: id,
    },
  });

  if (loading) {
    return null;
  }

  if (error) {
    return <UserNoFounf />;
  }

  const { getUser: datosUsuario } = data;


  const typodeModal = (type) => {
    switch (type) {
      case "avatar":
        setTitleModal("cambiar foto de perfil");
        setchildrenModal(<AvatarForm setShow={setShow} auth={auth} />);
        setShow(true);

        break;

      case "ajustes":
      
        setTitleModal("cambiar informacion de Usuario");
        setchildrenModal(<AjustesForm setShow={setShow} auth={auth} />);
        setShow(true);

        break;

      default:
        break;
    }
  };


  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile_left">
          <Image src={datosUsuario.avatar ? datosUsuario.avatar : ImagenNoFound} avatar onClick={() => username === nombreDeUsuario && typodeModal('avatar')} />
        </Grid.Column>
        <GridColumn width={11} className="profile_right">
        <HeaderProfile username={ datosUsuario.username} auth={auth} typodeModal={typodeModal} setShow = {setShow}/>
        <Follower username = {username}/>
          <div className="other">
            <p className="name"> {datosUsuario.name} </p>
            {datosUsuario.siteweb && (
              <a
                href={`https://${datosUsuario.siteweb}`}
                className="siteweb"
                target="_blank"
              >
                https://{datosUsuario.siteweb}
              </a>
            )}

            {datosUsuario.description && (
              <p className="description"> {datosUsuario.description} </p>
            )}
          </div>
        </GridColumn>
      </Grid>

      <ModalBasic show={show} setShow={setShow} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
};

export default Profile;
