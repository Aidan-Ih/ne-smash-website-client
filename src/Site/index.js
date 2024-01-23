import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "./index.css"

function Site() {
    const backend_url = "http://3.144.118.252:8080"
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
        console.log(data)
    }

    const updateFilter = (e) => {
        console.log(e)
        console.log(document.getElementById(e.target.id))

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
    }, [])

    return (
        <div className="content">

            <div className="d-flex justify-content-center">
                <div className="list-group eventListContainer">
                    <h1 className="title" >Massachusetts Smash Ultimate</h1>
                    <div className="featuredEventsContainer">
                        <h3>Featured Events</h3>
                        <ul>
                            <li>1/20 - Target Test 6</li>
                            <li><a className="featured-link" href="1/27 - Push The Limit 20">1/27 - Push The Limit 20</a></li>
                            <li>2/10 - Mash Harder 8</li>
                            <li>2/17 - UMA Fox Fury</li>
                        </ul>
                    </div>

                    <div className="upcomingEventsContainer">
                        <h3>Upcoming Events</h3>
                        {events.map((e, i) => {
                            return (
                                <div className="list-group-item eventListItem d-flex flex-row" key={e.id}>
                                    <img className="eventListItemPic"
                                        src={e.images.find((i) => i.type === "profile").url}></img>
                                    <div className="tournament-info-container">
                                        <a href={`https://start.gg/${e.slug}`} className="tournament-title">{e.name}</a>
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