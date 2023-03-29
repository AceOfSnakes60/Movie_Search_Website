import React from 'react';
import './About.css'
import { useRef } from 'react';
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFilm, 
    faVideo, 
    faPhotoFilm,
    faTv,
    faClapperboard,
    faCompactDisc,
    faHeadphones
} from '@fortawesome/free-solid-svg-icons'
import {
    Animator,
    ScrollContainer,
    ScrollPage,
    Sticky,
    batch,
    Fade,
    MoveOut,
} from 'react-scroll-motion'


function About() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_8n2lfxl",
                "template_mk8tn8a",
                form.current,
                "_3JypN_GQ5GBOQHUH"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    console.log("message sent");
                },
                (error) => {
                    console.log(error.text);
                }
            );
    }

    return (
        <div className='about-cointainer'>
            <ScrollContainer>
                    <ScrollPage>
                        <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -800))}>
                            <h1>WHO WE ARE </h1>
                        </Animator>
                    </ScrollPage>
                <ScrollPage>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -800))}>
                        <div className='section-2'>
                            <FontAwesomeIcon icon={faFilm} bounce size="2xl" style={{ color: "#FFF" }} />
                            <p>
                                Once upon a time, there was a group of film enthusiasts who loved to watch movies and
                                discuss them with their friends. However, they found it difficult to keep track of all
                                the new releases and the latest movie trailers.
                            </p>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -800))}>
                        <div className='section-2'>
                        <FontAwesomeIcon icon={faVideo} beatFade size="2xl" style={{ color: "#FFF" }}/>
                            <p>
                                One day, they had an idea to create a website that would help them and other movie fans stay
                                up to date on the latest releases, reviews, and trailers. They decided to call it "Movie Paradise."
                            </p>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -800))}>
                        <div className='section-2'>
                            <FontAwesomeIcon icon={faPhotoFilm} flip size="2xl" style={{ color: "#FFF" }}/>
                            <p>
                                The group of friends pooled their resources and skills together to create the website.
                                They hired web developers to build the site and designers to create a visually appealing interface.
                                They also recruited writers to create movie reviews and news articles for the site.
                            </p>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -400))}>
                        <div className='section-2'>
                        <FontAwesomeIcon icon={faTv} shake size="2xl" style={{ color: "#FFF" }}/>
                            <p>
                                Within a few months, Movie Paradise had become a popular destination for movie lovers around the world.
                                People could browse through the latest movies, read reviews, and watch trailers all in one place.
                                The site also had a feature that allowed users to rate and comment on movies, creating a community of
                                movie enthusiasts who shared their opinions and recommendations.
                            </p>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -400))}>
                        <div className='section-2'>
                        <FontAwesomeIcon icon={faClapperboard} beat size="2xl" style={{ color: "#FFF" }}/>
                            <p>
                                Movie Paradise became a paradise for movie enthusiasts, who eagerly awaited the latest updates and reviews.
                                It also attracted the attention of filmmakers and studios who wanted to promote their movies on the site.
                            </p>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -400))}>
                        <div className='section-2'>
                        <FontAwesomeIcon icon={faCompactDisc} spin size="2xl" style={{ color: "#FFF" }}/>
                            <p>
                                As the site grew, the team behind Movie Paradise continued to improve it. They added new features like personalized
                                movie recommendations based on a user's viewing history and a mobile app for users to access the site on the go.
                            </p>
                        </div>
                    </Animator>
                </ScrollPage>
                <ScrollPage>
                    <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -400))}>
                        <div className='section-2'>
                        <FontAwesomeIcon icon={faHeadphones} bounce size="2xl" style={{ color: "#FFF" }}/>
                            <p>
                                Today, Movie Paradise is one of the top movie websites on the internet. It has a dedicated community of users who trust
                                its recommendations and reviews. The site has also expanded its coverage to include TV shows, documentaries,
                                and other forms of visual entertainment.
                            </p>
                        </div>
                    </Animator>
                </ScrollPage>
            </ScrollContainer>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>Contact with us</h2>
            <div className='contactField'>
                <form ref={form} onSubmit={sendEmail}>
                    <label>Name</label>
                    <input type="text" name="user_name" />
                    <label>Email</label>
                    <input type="email" name="user_email" />
                    <label>Message</label>
                    <textarea name="message" />
                    <input type="submit" value="Send" />
                </form>
            </div>
            <br/>
        </div>
    )
}

export default About;