import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import './Footer.css';
import logo from '../images/logo.jpg'

function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
      console.log(email);
      alert("You have successfully subscribed to our newsletter")
    };
  
    const handleInputChange = (e) => {
      setEmail(e.target.value);
    };

    return (
        <div className='Container' id="footer">
            <div className='logo'>
                <p></p>
                <img src={logo} alt="Company-logo" />
                <h5>Movie Paradise</h5>
            </div>
            <div className='contact'>
                <h5>Contact</h5>
                <p><a href="mailto:info@adoptTheSausage.com">info@MovieParadise.com</a></p>
                <p>tel: +48 600 600 600</p>
                <p>plac Mariacki 5, 31-042 Kraków</p>
            </div>
            <div className='social-media'>
                <div className='subscribe'>
                    <h5>Get the freshest movies news</h5>
                    <input type="text" value={email} onChange={handleInputChange} placeholder="  Your email here" />
                    <button onClick={handleSubscribe}>Subscribe</button>
                </div>
                <p></p>
                <h5>Follow us</h5>
                <a href='https://www.facebook.com/homeofmovies29/' rel="noreferrer" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href='https://www.instagram.com/movies/?hl=en' rel="noreferrer" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley' rel="noreferrer" target="_blank">
                    <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a href='https://twitter.com/elonmusk/with_replies' rel="noreferrer" target="_blank">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
            </div>
        </div>
    )
}

export default Footer;