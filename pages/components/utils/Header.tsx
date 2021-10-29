import React, { useEffect } from 'react'
import "bootswatch/dist/cyborg/bootstrap.min.css";
import Link from 'next/link';
import { GetStaticProps } from 'next';

const Header = React.memo(function Header() {
  
  var links:Element[];
  useEffect(() => {
    links  = Array.from(document.getElementsByClassName('nav-link'));
    links.map((link, index) => { 
      link.getAttribute('href') === location.pathname && link.classList.add('active');
      // console.log(link.getAttribute('href'))
    })
  },[])

  const handleOnClickLink = (e:HTMLElement) => {
      // links.map((link, index) => {
      //   console.log(link.getAttribute('href'));
      //   link.classList.remove('active');
      // })
      // e.classList.add('active')
      // console.log(e.currentTarget.classList.add('active'))
      // e.currentTarget?.classList.add('active')
  }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
            <Link href="/" >
                <a className="nav-link" onClick={(event) => handleOnClickLink}>Rechercher une adresse
                </a>
            </Link>
              </li>
              <li className="nav-item">
            <Link href="/Autocompletion">
                <a className="nav-link" onClick={(event) => handleOnClickLink}>AutoComplétion adresse</a>
             </Link>
                </li>
              <li className="nav-item">
            <Link href="/Cinema">
                <a className="nav-link" onClick={(event) => handleOnClickLink}>Rechercher les cinemas</a>
             </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
})

export default React.memo(Header)
