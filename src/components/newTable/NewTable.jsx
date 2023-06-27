import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import React, { useState, useEffect, useContext } from 'react'
import { db } from '../../firestore';
import DataTable, {createTheme} from 'react-data-table-component';
import AdditionalInfo from "../AdditionalInfo/AdditionalInfo"
import { AuthContext } from '../../context/AuthContext';
import "./newTable.css";

createTheme('dark', {
    text: {
        primary: "#FFF",
        secondary: "#F7F7F9",
    },
    background: {
        default: "#232241",
    },
    context: {
        background: "#18172E",
        text: "#FFFFFF",
    },
});


function NewTable() {
    const [data, setData] = useState({});
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'conferences'), (snapshot) => {
            const conferences = snapshot.docs.reduce((acc, doc) => {
                acc[doc.id] = { id: doc.id, ...doc.data() };
                return acc;
            }, {});
            setData(conferences);
        });

        return () => unsubscribe();
    }, []);

    

    const addFav = async (conferenceId) => {
        const userRef = doc(db, 'users', currentUser.uid);
        const favoritesRef = collection(userRef, 'favorites');
      
        try {
          // Check if the conference is already added to favorites
          const favoriteQuery = query(favoritesRef, where('conferenceId', '==', conferenceId));
          const favoriteSnapshot = await getDocs(favoriteQuery);
      
          if (!favoriteSnapshot.empty) {
            console.log('Conference already added to favorites.');
            alert("That conference is already in your favorites.");
            return;
          }
      
          // Get the conference details
          const conference = data[conferenceId];
      
          // Add the conference to favorites
          await addDoc(favoritesRef, {
            conferenceId: conferenceId,
            conferenceName: conference.conferenceName,
            acronym: conference.acronym,
            conferenceStartingDate: conference.conferenceStartingDate,
            conferenceEndingDate: conference.conferenceEndingDate,
            createdAt: serverTimestamp(),
          });
      
          console.log('Conference added to favorites:', conference);
        } catch (error) {
          console.error('Error adding conference to favorites:', error);
        }
      };


    const ExpandedComponent = ({ data }) => <AdditionalInfo conf={data} />

    const columns = [
        {
            name: 'Conference Name',
            selector: row => row.conferenceName,
        },
        {
            name: 'Conference Starting Date',
            selector: row => row.conferenceStartingDate,
        },
        {
            name: "Conference Ending Date",
            selector: row => row.conferenceEndingDate,
        }
    ];

    const dataArray = Object.values(data);

    return (
        <div className='conf-table-wrapper'>
            <DataTable
                columns={columns}
                data={dataArray}
                expandableRows
                theme="dark"
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    );
}

export default NewTable