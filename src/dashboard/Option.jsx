import React from 'react'
import { useNavigate } from "react-router-dom";
const Option = () => {
    const navigate = useNavigate();

    function nav1(){
        navigate('/allstudent');
    }
    function nav2(){
        navigate('/inventory');
    }
    function nav3(){
        navigate('/menu')
    }

  return (
    <div>
        <div className='flex gap-10'>
            <button onClick={nav1}>
                total student record 
            </button>
            <button onClick={nav2}>
                inventory management system
            </button>
            <button onClick={nav3}>
                mess updates
            </button>
        </div>
    </div>
  )
}

export default Option