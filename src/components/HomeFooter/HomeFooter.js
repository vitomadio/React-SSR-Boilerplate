import React from 'react'
import LogoSVG from '../SVGs/LogoSVG';
import './HomeFooter.css';

export default () => {
  return (
    <div className="container-fluid px-0" style={styles.container}>
      <div className="container pt-0 pt-md-3">
        <div className="row align-items-center" style={{ height: '100%' }}>
          <div className="col-4 col-md-6 text-center" style={{ color: '#898989' }}>
            <p className="mb-0 footer-copyrights">© 2019 Cryptocharts Ltd.</p>
          </div>
          <div className="col-8 col-md-6 d-flex">
            <div className="col-5 float-right footer-logo">
              <LogoSVG fillOne="#898989" width={83.537} height={22.634} />
            </div>
            <div className="col-7 col-md-6 float-right d-flex footer-socials">
              <img src="/assets/twitter.svg" className="mr-1 mr-md-2 mr-lg-3" style={styles.img} alt="twetter-logo" />
              <img src="/assets/linkedin.svg" className="mr-1 mr-md-2 mr-lg-3" style={styles.img} alt="linkedin-logo" />
              <img src="/assets/facebook.svg" className="mr-1 mr-md-2 mr-lg-3" style={styles.img} alt="facebook-logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: '#181b1c',
    height: 60,
    borderTop: '1px solid #898989',
    clear: 'both',
    width: '100%'


  },
  img: {
    width: 30
  }
}
