import React from 'react';
import './About.css'
import { useState } from 'react';

function About() {
    const [email, setEmail] = useState("");
    const handleSubscribe = () => {
        console.log(email);
        alert("You have successfully subscribed to our newsletter")
      };
    
      const handleInputChange = (e) => {
        setEmail(e.target.value);
      };
  

    return (
        <div className='About'>
            <div className='about-text'>
                <h1>WHO WE ARE </h1>
                <hr />
                <p>
                    Once upon a time, there was a group of film enthusiasts who loved to watch movies and
                    discuss them with their friends. However, they found it difficult to keep track of all
                    the new releases and the latest movie trailers.
                </p>
                <p>
                    One day, they had an idea to create a website that would help them and other movie fans stay
                    up to date on the latest releases, reviews, and trailers. They decided to call it "Movie Paradise."
                </p>
                <p>
                    The group of friends pooled their resources and skills together to create the website.
                    They hired web developers to build the site and designers to create a visually appealing interface.
                    They also recruited writers to create movie reviews and news articles for the site.
                </p>
                <p>
                    Within a few months, Movie Paradise had become a popular destination for movie lovers around the world.
                    People could browse through the latest movies, read reviews, and watch trailers all in one place.
                    The site also had a feature that allowed users to rate and comment on movies, creating a community of
                    movie enthusiasts who shared their opinions and recommendations.
                </p>
                <p>
                    Movie Paradise became a paradise for movie enthusiasts, who eagerly awaited the latest updates and reviews.
                    It also attracted the attention of filmmakers and studios who wanted to promote their movies on the site.
                </p>
                <p>
                    As the site grew, the team behind Movie Paradise continued to improve it. They added new features like personalized
                    movie recommendations based on a user's viewing history and a mobile app for users to access the site on the go.
                </p>
                <p>
                    Today, Movie Paradise is one of the top movie websites on the internet. It has a dedicated community of users who trust
                    its recommendations and reviews. The site has also expanded its coverage to include TV shows, documentaries,
                    and other forms of visual entertainment.
                </p>
                <div className='contact'>
                    <h5>Contact</h5>
                    <p><a href="mailto:info@adoptTheSausage.com">info@MovieParadise.com</a></p>
                    <p>tel: +48 600 600 600</p>
                    <p>plac Mariacki 5, 31-042 Kraków</p>
                </div>
                <div className='subscribe'>
                    <h5>Get the freshest movies news</h5>
                    <input type="text" value={email} onChange={handleInputChange} placeholder="  Your email here" />
                    <button onClick={handleSubscribe}>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default About;