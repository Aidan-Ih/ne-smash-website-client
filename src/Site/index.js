import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "./index.css"

function Site() {
    const backend_url = "https://ne-smash-website-server.onrender.com"
    const [events, setEvents] = useState([]);
    const [featured, setFeatured] = useState(["hi"]);
    const [active, setActive] = useState({
        "MA": true,
        "VT": true,
        "CT": true,
        "RI": true,
        "NH": true,
        "ME": true
    })

    const getUpcomingEvents = async () => {
        const response = await axios.get(backend_url + "/getUpcoming")
        const data = response.data
        setEvents(data)
    }


    const convertDay = (num) => {
        switch (num) {
            case 0: return "Sunday"
            case 1: return "Monday"
            case 2: return "Tuesday"
            case 3: return "Wednesday"
            case 4: return "Thursday"
            case 5: return "Friday"
            case 6: return "Saturday"
            default: break
        }
    }

    const getDateFromUnix = (timestamp) => {
        const d = new Date(timestamp * 1000)
        const date = d.getDate()
        const month = d.getMonth() + 1
        const day = convertDay(d.getDay())
        var formatted = day + ", " + month + "/" + date
        return formatted
    }

    useEffect(() => {
        getUpcomingEvents()
        console.log(events)
    }, [])

    const getTournamentImage = (e) => {
        const filtered = e.images.filter((i) => i.type === "profile")
        if (filtered.length === 1) {
            return filtered[0].url
        }
        else {
            return ""
        }
    }

    return (
        <div className="content">

            <div className="d-flex justify-content-center">
                <div className="list-group eventListContainer">
                    <h1 className="title" >Massachusetts Smash Ultimate</h1>
                    <div className="featuredEventsContainer">
                        <h3>Featured Upcoming Events</h3>
                        <ul>
                            <li><a className="featured-link"
                                href="https://start.gg/suma"
                                target="_blank"
                                rel="noopener noreferrer">2/17 - UMA Fox Fury (MROS Qualifier)</a></li>
                            <li><a className="featured-link"
                                href="https://start.gg/tournament/mass-runs-on-smash-invitational"
                                target="_blank"
                                rel="noopener noreferrer">3/2 - Mass Runs On Smash (Invitational)</a></li>
                            <li><a className="featured-link"
                                href="https://www.start.gg/tournament/new-england-ultimate-arcadian-2024/details"
                                target="_blank"
                                rel="noopener noreferrer">3/9 - New England Arcadian</a></li>
                            <li><a className="featured-link"
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer">4/27 - Umass Games</a></li>
                            <li><a className="featured-link"
                                href="https://start.gg/beach"
                                target="_blank"
                                rel="noopener noreferrer">8/10 - Boston Blue Beat: Beach Episode</a></li>

                        </ul>
                        If you would like your event featured, contact @fluffiluff_ssb on twitter or @fluffiluff on discord.
                        Featured tournaments are monthly/regional scale events.
                    </div>

                    <div className="upcomingEventsContainer">
                        <h3>All Upcoming Events</h3>
                        {events.map((e, i) => {
                            console.log(e)
                            return (
                                <div className="list-group-item eventListItem d-flex flex-row" key={e.id}>
                                    <img className="eventListItemPic"
                                        src={getTournamentImage(e)}></img>
                                    <div className="tournament-info-container">
                                        <a href={`https://start.gg/${e.slug}`} className="tournament-title" target="_blank"
                                            rel="noopener noreferrer">{e.name}</a>
                                        <div>{getDateFromUnix(e.startAt)}</div>
                                        <div>{e.venueAddress}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div >
    );
}

export default Site;