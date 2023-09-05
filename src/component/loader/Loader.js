import React from 'react'
import  ReactDOM  from 'react-dom'
import loaderIMG from '../../asset/loader.gif'
import './loader.scss'
const Loader = () => {
    return ReactDOM.createPortal(
        <div className='wrapper'>
            <div className='loader'>
                <img src={loaderIMG} alt='loading'/>
        
            </div>
        </div>,
        document.getElementById('loader')
          )
}
export const SpinnerImg = () =>{
    return(
        <div className='--center-all'>
<img src={loaderIMG} alt='loading'/>
        </div>
    )
  }

export default Loader