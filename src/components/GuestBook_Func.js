import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import config from './config.js'
import { database } from 'firebase'
const firebase = require('firebase')

function App(){
    const {data,setData} = useState([])
    const [shoudRender , setShouldRender] = useState(true)
    const sample = ["hi","hello","how are you","test"]

    useEffect(() => {
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }

        //get a reference to the database
        let ref = firebase.database.ref('data')

        //retrieve its data
        ref.on( 'value', snapshot => {
            const state = snapshot.val()
            setData(state)
        })
    }, [shoudRender])

return(
    <div className="App">
        <header className="App-header">
            
        </header>
    </div>
)
}
