/*Load Icon for skyShare.
Description: This displays a moving giraffe anytime there is something on the site that needs to load.  
Programmers: Brynn Hare
Date Created: 10/29/2024
*/

"use client";
import React from "react"; //import the react module
import useGif from '../../public/images/giraffegif.gif' //grab the loading gif from the images folder
const Load = () => { //create the load component
    return (
        <div style={styles.loads}> 
            <img src={useGif} alt="Loading..." style={styles.gif} />
            <p>Loading...</p>
        </div>
    )
};

const styles = { //style the load and use the correct gif
    loads: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    gif: {
        width: '60px',
        height: '60px',
    },
};

export default Load;