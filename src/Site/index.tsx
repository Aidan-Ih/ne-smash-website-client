import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import "./index.css"
import UpcomingEvents from './UpcomingEvents';
import FeaturedEvents from './FeaturedEvents';

function Site() {

    interface StateStateInterface {
        MA: boolean
        CT: boolean
        NH: boolean
        VT: boolean
        ME: boolean
        RI: boolean
    }

    const backend_url = "https://ne-smash-website-server.onrender.com"
    const [events, setEvents] = useState<Tournament[]>([]);
    const [statestate, setStateState] = useState<StateStateInterface>({ "MA": true, "CT": false, "NH": false, "VT": false, "ME": false, "RI": false })

    //get upcoming tournaments from start.gg
    const getUpcomingEvents = async () => {
        const response = await axios.get(backend_url + "/getUpcoming")
        const data = response.data
        setEvents(data)
    }

    function getStateState(state: string): boolean{
        switch (state) {
            case "MA": return statestate.MA
            case "CT": return statestate.CT
            case "NH": return statestate.NH
            case "VT": return statestate.VT
            case "ME": return statestate.ME
            case "RI": return statestate.RI
        }
        return false
    }

    useEffect(() => {
        getUpcomingEvents()
    }, [])

    return (
        <div className="content">
            <div className="d-flex justify-content-center">
                <div className="list-group eventListContainer">
                    <h1 className="title">New England Smash Ultimate</h1>
                    <div className="featuredEventsContainer">
                        <h3>Featured Upcoming Events</h3>
                        {events.length === 0 ? "Loading featured events..." : <FeaturedEvents events={events} />}
                    </div>
                    <div className="upcomingEventsContainer">
                        <h3>Upcoming Events</h3>
                        <div className="checkbox-row d-flex flex-row">
                            <div className="state-checkbox">
                                <label htmlFor="MA-check" className="state-ckbox-label">MA</label>
                                <input
                                    id="MA-check"
                                    type="checkbox"
                                    checked={statestate.MA}
                                    onClick={(e) => setStateState({ ...statestate, "MA": !statestate.MA })}>
                                </input>
                            </div>
                            <div className="state-checkbox">
                                <label htmlFor="CT-check" className="state-ckbox-label">CT</label>
                                <input
                                    id="CT-check"
                                    type="checkbox"
                                    checked={statestate.CT}
                                    onClick={(e) => setStateState({ ...statestate, "CT": !statestate.CT })}>
                                </input>
                            </div>
                            <div className="state-checkbox">
                                <label htmlFor="NH-check" className="state-ckbox-label">NH</label>
                                <input
                                    id="NH-check"
                                    type="checkbox"
                                    checked={statestate.NH}
                                    onClick={(e) => setStateState({ ...statestate, "NH": !statestate.NH })}>
                                </input>
                            </div>
                            <div className="state-checkbox">
                                <label htmlFor="VT-check" className="state-ckbox-label">VT</label>
                                <input
                                    id="VT-check"
                                    type="checkbox"
                                    checked={statestate.VT}
                                    onClick={(e) => setStateState({ ...statestate, "VT": !statestate.VT })}>
                                </input>
                            </div>
                            <div className="state-checkbox">
                                <label htmlFor="ME-check" className="state-ckbox-label">ME</label>
                                <input
                                    id="ME-check"
                                    type="checkbox"
                                    checked={statestate.ME}
                                    onClick={(e) => setStateState({ ...statestate, "ME": !statestate.ME })}>
                                </input>
                            </div>
                            <div className="state-checkbox">
                                <label htmlFor="RI-check" className="state-ckbox-label">RI</label>
                                <input
                                    id="RI-check"
                                    type="checkbox"
                                    checked={statestate.RI}
                                    onClick={(e) => setStateState({ ...statestate, "RI": !statestate.RI })}>
                                </input>
                            </div>
                        </div>
                        {events.length === 0 ? "Loading Events..." : <UpcomingEvents events={events.filter((elt) => getStateState(elt.addrState))} />}
                    </div>
                </div>
            </div>
            <div className="bottom-content">
                Developed and maintained by Aidan "Fluffiluff"
                <br></br>
                Contact @fluffiluff_ssb on Twitter for questions
            </div>
        </div >
    );
}

export default Site;