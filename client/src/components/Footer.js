import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';


function Footer() {
    
    return (
        <div className='Container' id="footer">
            <hr style={{width: "80%"}}/>
            <p>Copyright © 2023 Team 3 13/03/23 in CodeCool</p>
            <div className='social-media'>
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