import React, { useState, useEffect } from 'react'
import ButtonComponent from './Button'
import { Grid, Typography } from '@material-ui/core'
import './Counter.scss'

export default function Counter({buttonCount, values, setValues, socket, count}) {
  const [Count1,setCount1] = useState(count);
  
  const sendCounterValue=(data)=>{
    const client=2
    socket.emit('send_CounterValue',data,client)
  }

  useEffect(()=>{
    //setCount1(count)
    if(count===0){
      for (let i=0; i<values.length; i++){
        let arrval= values[i]
        if(arrval.ButtonId === buttonCount){
          setCount1(arrval.ButtonValue)
        }
      }
    }else{
      setCount1(count)
    }
  },[count])

  const handleIncrememnt= (e,buttonCount)=>{
    setCount1(Count1=>Count1+1)
    let NewCount = Count1+1
    let prevArray = [...values]
    sendCounterValue({ButtonId:buttonCount,ButtonValue:NewCount})
    if(prevArray.length === 0){
        prevArray.push({ButtonId:buttonCount,ButtonValue:NewCount})
    }else{
        var update = true
        for (let i=0;i<prevArray.length;i++){
            let currArr = prevArray[i]
            if( currArr.ButtonId === buttonCount ){
                currArr.ButtonValue = NewCount
                update = false
                break
            }
        }
        if(update){
            prevArray.push({ButtonId:buttonCount,ButtonValue:NewCount})
        }
    }
    setValues(prevArray)
  }

  return (
    <Grid container item xs={12} className='Card'>
        <Grid container item xs={12} className='Counter-Section'>
        {/* <input type='text' className='Count-text' value={Count1} id='count' name='count' readOnly={true}></input> */}
        <label><Typography className='Count-text'>{Count1}</Typography></label>
        </Grid>
        <Grid container item  xs={12} className='Button-Section'>
            <ButtonComponent
            label={`Button ${buttonCount}`}
            handleClick={(e)=>handleIncrememnt(e,buttonCount)}
            type='Button'
            />
        </Grid>
    </Grid>
  )
}
