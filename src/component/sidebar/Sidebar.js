import {useState} from 'react'
import './sidebar.scss';
import menu from '../../Data/sidebar';
import Sidebartem from './Sidebartem'
import { RiProductHuntLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import {AiTwotoneLeftCircle,AiTwotoneRightCircle} from 'react-icons/ai'

const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggle = ()=> setIsOpen(!isOpen)

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className='layout'>
        <div className='sidebar' style={{width: isOpen ? '230px' : '140px'}}>
<div className='top_section'>
    <div className='logo' style={{display: isOpen ? 'block' : 'none'}}>
    <RiProductHuntLine size={50} style={{cursor:"pointer"}} onClick={goHome}/>
    {/* style={{marginLeft:isOpen ? '100px': '1px'}} */}
    </div>
    <div className='bars'>
      <AiTwotoneLeftCircle onClick={toggle} style={{display: isOpen ? 'block' : 'none'}}/>
      <AiTwotoneRightCircle onClick={toggle} style={{display: isOpen ? 'none' : 'block'}}/>

    </div>
    

</div>
{menu.map((item, index) =>{
    return(
      <Sidebartem key={index} item={item} isOpen={isOpen}/>
    )
})}
        </div>
        <main style={{paddingLeft:isOpen ? '230px' : '140px', transition : 'all .5s'}}>{children}</main>
    </div>
  )
}

export default Sidebar