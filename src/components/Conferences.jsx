import React, { useContext, useEffect, useState } from 'react'
import ConferenceCard from './ConferenceCard';
import { db } from '../firestore';
import { AuthContext } from '../context/AuthContext';
import { collection, onSnapshot } from 'firebase/firestore';

function Conferences() {
    const { currentUser } = useContext(AuthContext);

    const [confs, setConfs] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, "users", currentUser.uid, "favorites"), (snapshot) => {
            setConfs(snapshot.docs.map((doc) => doc.data()));
        })
    }, [currentUser]);

    return (
    <div className='todo-card'>
        <h7>your conferences</h7>
        <div className="conf-grid">
            {confs.map((conf) => {
                const dateRange = conf.conferenceStartingDate + "---" + conf.conferenceEndingDate;
    //            const dateRange = `${conf.conferenceStartingDate.toDate().toDateString()} --- ${conf.conferenceEndingDate.toDate().toDateString()}`;
                return (
                    <ConferenceCard key={conf.timestamp} acronym={conf.acronym} dateRange={dateRange}  />
            )})}
        </div>

    </div>
  )
}

export default Conferences