import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "./index.css"
import { Link } from "react-router-dom"

function Site() {
    const [events, setEvents] = useState([]);
    
    const getRecentEvents = async () => {
        const response = await axios.get("http://localhost:4000/getUpcoming")
        const data = response.data
        setEvents(data)
        console.log(data)
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


    return (
        <div>
            <h1>Homepage</h1>

            <div className="user-content">
                <h1>USER SPECIFIC CONTENT HERE EVENTUALLY</h1>
            </div>

            <div className="anon-content">
                <button className="btn btn-danger" onClick={getRecentEvents}>GET EVENTS</button>
                <h1>Upcoming Events</h1>
                <div className="list-group eventListContainer">
                    {events.map((e, i) => {
                        return (
                            <div className="list-group-item eventListItem d-flex flex-row" key={e.id}>
                                <img className="eventListItemPic"
                                    src={e.images.find((i) => i.type === "profile").url}></img>
                                <div className="tournament-info-container">
                                    <div>{getDateFromUnix(e.startAt)}</div>
                                    <div>{e.city}, MA</div>
                                    <div>ID: {e.id}</div>
                                </div>


                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Site;