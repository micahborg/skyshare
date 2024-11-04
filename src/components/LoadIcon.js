/*Load Icon for skyShare.
Description: This displays a moving giraffe anytime there is something on the site that needs to load.  
Programmers: Brynn Hare
Date Created: 10/29/2024
Edit Dates: 11/3
*/

"use client";
import React from "react"; //import the react module
const Load = () => { //create the load component
    return (
        <div style={styles.loads}> 
            <img src="/images/transparentgiraffegif.gif" alt={"Loading..."} style={styles.gif} />
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
        width: '200px',
        height: '200px',
    },
};

export default Load;