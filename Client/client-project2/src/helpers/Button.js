import React from 'react'
import Button from '@mui/material/Button';
import './Button.scss'

export default function ButtonComponent({label, handleClick, type}) {
  return (
    <Button 
    variant="contained" 
    size="medium"
    className='Btn-Design'
    onClick={handleClick}
    type={type}
    >
    {label}
    </Button>
  )
}
