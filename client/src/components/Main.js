import React from 'react';

function Main() {

    let content =
        <div className="main">
            <input type="search" className="search" placeholder="Search for movies.." />
            <div className="chooseGenre">
                <button className="genres">action</button>
                <button className="genres">comedy</button>
                <button className="genres">drama</button>
                <button className="genres">sci-fi</button>
            </div>
            <div className="upcoming">
                <h1>Upcoming Movies</h1>
                <div className="upcomingMovie">Avatar</div>
                <div className="upcomingMovie">Avatar</div>
                <div className="upcomingMovie">Avatar</div>
            </div>
            <div className="randomMovie">
                <div className="randomMovieBlock">TLOU</div>
                <div className="randomMovieBlock">AVENGERS</div>
                <div className="randomMovieBlock">kjefb</div>
                <div className="randomMovieBlock">rbr</div>
            </div>
            <div className="highestRated">
                TOP 5 MOVIES
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Rating</th>
                    </tr>
                    {/* <ShowHighestRated movie={highestRated[0]}/>
                    <ShowHighestRated movie={highestRated[1]}/> */}
                </table>
            </div>
            {/* <div>{highestRated}</div> */}
        </div>

    )
}

export default Main;

