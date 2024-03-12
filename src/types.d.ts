interface Event {
    name: string;
    id: number;
}

interface Image {
    type: string;
    url: string;
}

interface Tournament {
    id: number;
    name: string;
    url: string;
    city: string;
    venueAddress: string;
    startAt: number;
    shortSlug: string;
    slug: string;
    events: Event[];
    images: Image[];
    addrState: string;
}

interface UpcomingEventsProps {
    events: Tournament[];
}