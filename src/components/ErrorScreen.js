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
            <p>ERROR!</p>
        </div>
    )
};

const styles = { //style the error and use the correct image
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

export default Errors;



