import React from 'react'
import "bootswatch/dist/cyborg/bootstrap.min.css";
import Link from 'next/link';

const Header = React.memo(function Header() {
    return (
      <div className='header'>
          <div className="cinemaps-cine">
            <Link href='/'> Cine </Link>
          </div>
      </div>
    )
})

export default React.memo(Header)
