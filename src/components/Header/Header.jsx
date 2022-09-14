import { Link } from "react-router-dom";
import "../../layout/layout.scss";
import "./Header.scss";

import { Container, Grid, Image } from "semantic-ui-react";

import LogoRedSocial from "../../assets/img/recurso9Recurso-8.svg";
import RightHeader from "./RigtHeader/RightHeader";
import BuscadorHeader from "./BuscadorHeader/BuscadorHeader";
const Header = () => {
  return (
    <>
      <div className="todoelHeader">
        <Container>
          <Grid>
            <Grid.Column width={4} className="logo">
            <Link to="/">
              <Image src={LogoRedSocial} alt="logo" className="logo" /></Link>
            </Grid.Column>
            <Grid.Column width={8} className="buscador">
              <BuscadorHeader/>
            </Grid.Column>

            <Grid.Column width={4} className="nav">
              
                <RightHeader/>
            
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Header;
