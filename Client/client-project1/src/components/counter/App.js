import React, { useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import './App.scss'
import Counter from '../../helpers/Counter';
import ButtonComponent from '../../helpers/Button';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3003')

//ButtonList is scalable can add more id's in order to get dynamic counter Component (Provided the id's need to be unique)
let ButtonList = [
  {
    id:1
  },
  {
    id:2
  },
  {
    id:3
  }
]

export default function App() {
  const [values,setValues]=useState([])
  const [incomingId, setIncomingId] = useState(0)
  const [incomingCount, setIcomingCount] = useState(0)

  //Function posts the array of counter values to backend API
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/Create',{values})
    .then((res)=>{
      alert(res.data)
    }).catch(err=>{
      alert("Unable to submit ")
    })
  }
  
  //Reads the Communication emitted from Backend and updates the State
  useEffect(()=>{
    socket.on('send_Counterback',(data,err)=>{
        if(err) throw err
        setIncomingId(data.ButtonId)
        setIcomingCount(data.ButtonValue)
    })

  },[socket])

  return (
    <Grid container xs={12} className = 'App-Container'>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <Grid container xs={12} className='Card-Container'>
          {
            ButtonList.map((item)=>{
                let current = item.id
                let currentIdMatch = (current === incomingId)
                return(
                <Grid container xs={3} className='Card-item' key={item.id}>
                  {
                  currentIdMatch ?
                  <Counter buttonCount={item.id} values={values} setValues={setValues} socket={socket} count={incomingCount}/>:
                  <Counter buttonCount={item.id} values={values} setValues={setValues} socket={socket} count={0}/>
                  }
                </Grid>
                )
            })
          }
          
      </Grid>
      <Grid container xs={12} className='submit-button'>
          <ButtonComponent
          label={'Submit'}
          type='submit'
          />
      </Grid>
      </form>
    </Grid>
  )
}

