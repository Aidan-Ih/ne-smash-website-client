const getTournamentImage = (e: Tournament) => {
    const filtered = e.images.filter((i) => i.type === "profile")
    if (filtered.length === 1) {
        return filtered[0].url
    }
    else {
        return ""
    }
}

const getDateFromUnix = (timestamp: number) => {
    const d = new Date(timestamp * 1000)
    const date = d.getDate()
    const month = d.getMonth() + 1
    const day = convertDay(d.getDay())
    var formatted = day + ", " + month + "/" + date
    return formatted
}

function convertDay(num: number): string {
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
    return "Error: Date Format Invalid"
}

function UpcomingEvent({ event }: { event: Tournament }) {
    return (
        <div className="list-group-item eventListItem d-flex flex-row" key={event.id}
        title={"eventid=" + event.id.toString()}>
            <img className="eventListItemPic"
                src={getTournamentImage(event)}></img>
            <div className="tournament-info-container">
                <a href={`https://start.gg/${event.slug}`} className="tournament-title" target="_blank"
                    rel="noopener noreferrer">{event.name}</a>
                <div className="tournament-info-text">{getDateFromUnix(event.startAt)}</div>
                <div className="tournament-info-text">{event.city}, {event.addrState}</div>
            </div>
        </div>
    )
}

function UpcomingEvents({ events }: { events: Tournament[] }) {
    return (
        <div>
            {events.map((e, i) => {
                return (
                    <UpcomingEvent event={e}/>
                )
            })}
        </div>
    )
}

export default UpcomingEvents;