//hooks components
import { Grid } from 'semantic-ui-react';
import Feed from './Feed/Feed';
import UsuariosNoSeguido from './UsuariosNoSeguido/UsuariosNoSeguido';

//recursos
import './home.scss';

const Home = () => {

  

  return (
   <Grid className='home'>
<Grid.Column 
className='home_left' width={11}>
<Feed/>
</Grid.Column>
<Grid.Column className='home_right' width={5} >

<UsuariosNoSeguido />

</Grid.Column>
   </Grid>
  )
}

export default Home