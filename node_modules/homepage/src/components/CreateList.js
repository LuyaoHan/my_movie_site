import React, { useEffect, useState } from 'react'
import '../App.css'
import config from './config.js'
import useForm from './useForm'

import { Alert } from 'reactstrap';

/*
node node_modules/reac  t-scripts/scripts/start.js

Fix react page doesn't update on file change *WORKS*
sudo -i
echo 1048576 > /proc/sys/fs/inotify/max_user_watches
exit

*/
const firebase = require('firebase')

function CreateList(){
    const CreateListStyle={
       
        backgroundColor: '#0e6e66',
        backgroundRepeat: 'repeat-y',
        position: 'relative',
        height: '80vh',
        width: '100%',
        display: 'flex',
        //alignItems: 'center',
        //justifyContent: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontStyle: '2px', 
        //textTransform: 'uppercase',
        letterSpacing: '1px'
    }
    const formInputFontStyle={
      fontFamily: 'Raleway, sans-serif',
      fontStyle: '32px', 
      marginBottom: '20px',
    }

    const formInputDivStyle={
      position: 'relative',
      fontSize: '12px',
      left:'10vw',
      top: '8vh'
    }


    const formLabelFontStyle={
      fontFamily: 'lucida grande,arial',
      fontSize: '1vw',
      fontWeight: 'bold',
      color: '#2E4A62',
      position: 'relative',
      top: '0vw',
      left:'-1vw'
    }
   
    useEffect(() => {
      if(!firebase.apps.length){
        firebase.initializeApp(config)
      }
    })

    const [values,setValues] = useState({newlist:""}) 

    const handleTextChange = event =>{
      console.log(event.target.name,"newlist is:" + event.target.value)
      setValues({    
        [event.target.name]: event.target.value, 
        });
    };
     
    

    //Submission function
    const handleSubmit = event =>{  
      console.log("enter submit callback")
      event.preventDefault();
      // firebase.database().ref('data').push().set(values);
      console.log("values.newlist is: "+values.newlist)
      firebase.database().ref('AllLists').child(values.newlist).set("")  //just create an empty list with stub ""
      setVisible(true);          
      //set everything to default after submission
      setValues({newlist:""}) 
      }
                                                     



    //used for configuring the alert box
    const [visible, setVisible] = useState(false);
    const onafterprint = () => setVisible(false);

return(
    <div className="CreateList" style={CreateListStyle}>
        <form onSubmit={handleSubmit} noValidate>
        
          <div style={formInputDivStyle}> 
            <label style={formLabelFontStyle}>List Name</label>
            <br/>
            <input name="newlist" type="newlist" value={values.newlist} onChange={handleTextChange} style={formInputFontStyle}/>
          </div>
          
  
          <div style={formInputDivStyle} onClick={handleSubmit} >
            <button type="submit">submit</button>
          </div>

          
          <Alert style={formInputDivStyle} color="info" isOpen={visible} toggle={onafterprint} fade={true} >
            The list is now added!
          </Alert>
        </form>
        
    </div>
)


}

export default CreateList;