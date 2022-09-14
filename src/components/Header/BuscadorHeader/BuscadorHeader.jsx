import './BuscadorHeader.scss'
import { Search } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import {SEACH_USER} from '../../../gql/user'
import {useState,useEffect} from 'react'
import { size } from 'lodash'
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ImagenNoFOund from '../../../assets/img/avatar.png'


const BuscadorHeader = () => {

    const [ buscador,setBuscador ] = useState(null)
    const [ result,setResult] = useState([])

    const {data,loading} = useQuery(SEACH_USER,{
        variables: {
            searchs : buscador
        }
    })



    useEffect(() => {
      
      if(size(data?.searchs) > 0){

        const user = [];

        data.searchs.forEach((userr,index) => {

          user.push({

            key: index,
            title:userr.username,
            image: userr.avatar,
            
          

          })


        })

        setResult(user)

      }else {

        setResult([])

      }
    
    }, [data])
    

   
const onChange = (e) => {

    if(e.target.value){
        setBuscador(e.target.value)
    }else{
        setBuscador(null)
    }
}

const handledreset = () => {
  setBuscador(null)
  setResult([])
}
    

  return (
    <Search
    className='search-users'
    fluid
    input={{icon: "search", iconPosition : "left"}}
    loading={loading}
    onSearchChange={onChange }
    value= {buscador || ""}
    results={result}
    onResultSelect={handledreset}
    resultRenderer={(e)=>(<ResultSearch data={e}/>)}
    
    />

  )
}

export default BuscadorHeader

function ResultSearch(props) {

  const {data} = props;

  return (

    <div>
        <Link className='Arreglaresto' to={`/${data.title}`}>
        <Image src={data.image ? data.image : ImagenNoFOund} />
        <h2>{data.title}</h2>
        </Link>
        
    </div>

  )

}