import React from 'react'

export default function Header() {

    let user = localStorage.getItem("userlogged")

  return (
    <div>
        <h1 className='font-bold'>Bienvenid@ de nuevo {user}</h1>
    </div>
  )
}
