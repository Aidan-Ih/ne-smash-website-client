import featured from "./featured"

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

function FeaturedEvent({ event }: { event: Tournament }) {
    return (
        <div className="list-group-item featuredEventListItem d-flex flex-row" key={event.id}>
            <img className="featuredEventPfp"
                src={getTournamentImage(event)}>
            </img>

            <div className="featured-link-container">
                <a href={"https://start.gg/" + event.slug} target="_blank"
                    rel="noopener noreferrer" className="featured-link">
                    {getDateFromUnix(event.startAt)} - {featured.find((elt) => elt.id === event.id)?.name}
                </a>
            </div>
        </div>
    )
}

function FeaturedEvents({ events }: { events: Tournament[] }) {
    var featured_filtered: Tournament[] = events.filter((e) => featured.map((i) => i.id).includes(e.id))

    return (
        <div>
            {featured_filtered.map((e, i) => {
                return (
                    <FeaturedEvent event={e} />
                )
            })}
            If you would like your event featured, reach out to @fluffiluff_ssb on Twitter
        </div>
    )
}

export default FeaturedEvents;