import { collection, onSnapshot, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useTable } from 'react-table';
import { db } from '../../firestore';
import './Table.css';

function Table() {
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Conference Name',
        accessor: 'conferenceName',
      },
      {
        Header: 'Starting Date',
        accessor: 'conferenceStartingDate',
      },
      {
        Header: 'Ending Date',
        accessor: 'conferenceEndingDate',
      },
    ],
    []
  );

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

  const tableData = useMemo(() => Object.values(data), [data]);
  const tableInstance = useTable({ columns, data: tableData });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const addFav = async (conferenceId) => {
    const userRef = doc(db, 'users', currentUser.uid);
    const favoritesRef = collection(userRef, 'favorites');

    try {
      // Check if the conference is already added to favorites
      const favoriteSnapshot = await getDoc(doc(favoritesRef, conferenceId));
      if (favoriteSnapshot.exists()) {
        console.log('Conference already added to favorites.');
        alert("That conference is already in your favorites. ")
        return;
      }

      // Get the conference details
      const conference = data[conferenceId];

      // Add the conference to favorites
      await addDoc(favoritesRef, {
        conferenceName: conference.conferenceName,
        conferenceStartingDate: conference.conferenceStartingDate,
        conferenceEndingDate: conference.conferenceEndingDate,
        createdAt: serverTimestamp(),
      });

      console.log('Conference added to favorites:', conference);
    } catch (error) {
      console.error('Error adding conference to favorites:', error);
    }
  };


  return (
    <div className="table-container">
      <div className="inner-container">
        <table {...getTableProps()}>
          <thead className="table-header">
            {headerGroups.map((group) => (
              <tr {...group.getHeaderGroupProps()}>
                {group.headers.map((col) => (
                  <th className="table-column-name" {...col.getHeaderProps()}>
                    {col.render('Header')}
                  </th>
                ))}
                <th> </th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1}>Loading...</td>
              </tr>
            ) : (
              rows.map((row, index) => {
                prepareRow(row);

                const conference = data[row.original.id];
                if (!conference) {
                  return null; // Skip rendering if conference is not found in data
                }

                return (
                  <tr
                    className={`row ${(index % 2 === 0) ? 'white' : ''}`}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => (
                      <td className="row-column" {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                    <td className='button-col'>
                      <button
                        className="tab-button"
                        onClick={() => addFav(row.original.id)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
