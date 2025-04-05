import React from 'react'
import logo from '../assets/logoimage.png';
function Logo({width='100px', height='100px'}) {

return(
<div className='flex items-center'>
    <img  width={width} height={height} src={logo} alt="image loading" />
</div>
)

}
export default Logo;