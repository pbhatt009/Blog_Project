import React from 'react'
function Button({
    children,
    type='button',
    bg='bg-blue-600',
    text='text-white',
    className='',
    ...props
}){
return (
<button type={type} className={`px-4 py-2 rouunded-lg ${className} ${bg} ${text}`}{...props}>
    {children}
</button>

)


}
export default Button;