
import { useQuery, gql } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useState } from 'react';
import Button from '@material-ui/core/Button';

// import Mission from './Mission'

import './grap.css';


const FILMS_QUERY = gql
    `
    {
        launchesPast(limit: 10) {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
            flickr_images
          }
          rocket {
            rocket_name
            first_stage {
              cores {
                flight
                core {
                  reuse_count
                  status
                }
              }
            }
            rocket_type
            rocket {
              company
              description
              height {
                meters
              }
            }
          }
          id
        }
      }
      
      
  
`;


function Grap() {

    let [selectedrow, setselectedrow] = useState({ id: -1 })

    const { data, loading, error } = useQuery(FILMS_QUERY);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    const classes = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    return (
        <div style={{ textAlign: '-webkit-center' }}>

            {selectedrow.id === -1 ?
                <div>            <h1>Burim Ismaili - Test Pabau</h1>

                    <div className="tablediv">
                        <TableContainer id="tableid">
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {/* <TableCell>ID</TableCell> */}
                                        <TableCell></TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Launch date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.launchesPast.map((row) => (
                                        <TableRow key={row.id} onClick={() => { setselectedrow(row) }} className="hoverRow">
                                            {/* <TableCell > {row.id} </TableCell> */}
                                            <TableCell ><img src={row.links.flickr_images.length > 0 ? row.links.flickr_images[0] : null} height="50" alt="" /> </TableCell>
                                            <TableCell >{row.mission_name}</TableCell>
                                            <TableCell>{row.launch_date_local}</TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                    </div>
                </div>
                :
                <div>
                    <Button variant="contained" color="primary" onClick={() => { setselectedrow({ id: -1 }) }}> Back </Button>
                    <table>
                        <thead>
                            <tr>
                                <th> Name </th>
                                <th> Type </th>
                                <th> Company </th>
                                <th> Description </th>
                                <th> Height(Meters) </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={selectedrow.id}>
                                <td>{selectedrow.rocket?.rocket_name}</td>
                                <td>{selectedrow.rocket?.rocket_type}</td>
                                <td>{selectedrow.rocket?.rocket.company}</td>
                                <td>{selectedrow.rocket?.rocket.description}</td>
                                <td>{selectedrow.rocket?.rocket.height.meters}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            }
        </div>

    );

}

export default Grap;
