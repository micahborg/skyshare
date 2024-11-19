/*Error Screen for skyShare.
Description: This displays an error message when something goes wrong.  
Programmers: Brynn Hare
Date Created: 11/3/2024
*/

"use client";
import React from "react"; //import the react module
const Errors = () => { //create the error component
    return (
        <div style={styles.loads}> 
            <img src="/images/sadgiraffe.png" alt={"ERROR!"} style={styles.gif} />
        </div>
    )
};

const styles = { //style the error and use the correct image
    loads: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '50vh'
    },
    gif: {
        width: '400px',
        height: '400px',
    },
};

export default Errors;



