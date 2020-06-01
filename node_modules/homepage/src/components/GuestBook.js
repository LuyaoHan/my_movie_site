import React, { useEffect, useState } from 'react'
import '../App.css'
import config from './config.js'
import useForm from './useForm'
import form_validate from './formValidate'
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { Alert } from 'reactstrap';

/*
node node_modules/reac  t-scripts/scripts/start.js

Fix react page doesn't update on file change *WORKS*
sudo -i
echo 1048576 > /proc/sys/fs/inotify/max_user_watches
exit

*/
const firebase = require('firebase')

function GuestBook(){
    const [data,setData] = useState([])
    const [shouldRender , setShouldRender] = useState(true)
    

    let scrollRef = null; //used to refer scrollRef, so that on content change window is scrolled to bottom automaticallu


    const guestBookStyle={
       
        backgroundColor: '#eadedb',
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

    const formPrintDivStyle={
      position: 'absolute',
      left:'35vw',
      top: '8vh',
      width: '60vw',
      height: '60vh',
      border: 'dotted blue',
      borderWidth: '2px',
      borderColor: '#2a4944',
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
        console.log("shouldRender: " + shouldRender);
        if(!firebase.apps.length){
            firebase.initializeApp(config)
        }

        //get a reference to the database
        let ref = firebase.database().ref('data')

        //retrieve its data       
        ref.on( 'value', snapshot => {
            const receivedJSON = snapshot.val()
            console.log(receivedJSON);
            snapshot.forEach(function(childSnapshot){
              var guestName = childSnapshot.child("guestName").val();
              var description = childSnapshot.child("description").val();
              var message = childSnapshot.child("message").val();
              var isPrivate = childSnapshot.child("isPrivate").val();
              var email = childSnapshot.child("email").val();
              var year = childSnapshot.child("year").val();
              var month = childSnapshot.child("month").val();
              var day = childSnapshot.child("day").val();

              console.log(guestName, description, message, isPrivate, email)
              
              const newPack=[];
              newPack.push("*Message on: " + year + "/" + month + "/" + day + "\n");
              newPack.push(guestName + "\n");
              if(description.length != 0) newPack.push(description + "\n");
              newPack.push(message + "\n");
              if(email.length != 0) newPack.push(email);
              newPack.push("\n\n\n");
              //[guestName,"\n",description,[{(description!="") ? "\n" : ""}],message,"\n",email,"\n\n\n"]
              console.log("packed to: " + newPack)
              if(!isPrivate){
                setData(prevPack => [...prevPack,newPack])
              }else {
                setValues({guestName:"",description:"",message:"",isPrivate:false,email:""}) 
                setErrors({guestName:"",description:"",message:"",isPrivate:"",email:"",hasError:""})
                setVisible(true);
              }
              //return true;       
            })
            //setData(state)
            console.log("After receive, data: " + data.map);
        })
    },[shouldRender])

    /*Form Operations*/
    //destructure event handler and values object from customized hook
    const {handleTextChange, handleClickChange, handleSubmit, values, setValues, setErrors,errors} = useForm(submit,form_validate); //destructure from customized hook useForm
                                                                  //"submit": useForm accepts a callback function name as argument when submit is clicked
                                                                  //"formValidate": useForm accepts the validation logics to check user input
  

    function submit(){
      console.log("submitted successfully.")
      //'data' here is a field in my database that stores all my messages info

      setData([]) //clear previous so that data don't duplicate
  
      //set everything to default after submission
      setValues({guestName:"",description:"",message:"",isPrivate:false,email:"",year:"",month:"",day:""}) 
      setErrors({guestName:"",description:"",message:"",isPrivate:"",email:"",hasError:""})
      

      firebase.database().ref('data').push().set(values);
      setVisible(true);
      //setShouldRender({
      //  shouldRender: true
      //})
    }
    const [visible, setVisible] = useState(false);
    const onafterprint = () => setVisible(false);

return(
    <div className="GuestBook" style={guestBookStyle}>
        <form onSubmit={handleSubmit} noValidate>
        
          <div style={formInputDivStyle}> 
            <label style={formLabelFontStyle}>Guest Name</label>
            <br/>
            <input name="guestName" type="guestName" value={values.guestName} onChange={handleTextChange} style={formInputFontStyle}/>
            {/*conditional rendering, displays the error _message_ written in formValidate */}
            {errors.guestName&& <p>{errors.guestName}</p>} 
          </div>
          
          <div style={formInputDivStyle}>
            <label style={formLabelFontStyle}>Description (optional)</label>
            <br/>
            <input name="description" type="description" value={values.description} onChange={handleTextChange} style={formInputFontStyle}/>
            {errors.description&& <p>{errors.description}</p>}
          </div>
          
          <div style={formInputDivStyle}>
            <label style={formLabelFontStyle}>Message</label>
            <br/>
            <input name="message" type="message" value={values.message} onChange={handleTextChange} style={formInputFontStyle}/>
            {errors.message && <p>{errors.message}</p>} 
          </div>

          <div style={formInputDivStyle}>
            <label style={formLabelFontStyle}>Choose isPrivate</label>
            <input name="isPrivate" type="checkbox"  value={!values.isPrivate} onClick={handleClickChange} style={formInputFontStyle}/>
          </div>
            
          <div style={formInputDivStyle}>
            <label style={formLabelFontStyle}>Email (optional)</label>
            <br/>
            <input name="email" type="email" value={values.email} onChange={handleTextChange} style={formInputFontStyle}/>

          </div>
          <div style={formInputDivStyle} onClick={handleSubmit} >
            <button type="submit">submit</button>
          </div>

          {/*alert message that is hidden until submit */}
          <Alert style={formInputDivStyle} color="info" isOpen={visible} toggle={onafterprint} fade={true} >
            Message sent successfully!
          </Alert>
        </form>
        
        <ScrollView style={formPrintDivStyle}  
          ref={k => scrollRef = k} //defines ref for the print window
          onContentSizeChange={()=>{        
            scrollRef.scrollToEnd({animated: true});
          }}
        >
          {data.map((s,index) => (
            <Text> 
             {s}
            </Text>
          ))}
          
        </ScrollView>

        

        
    </div>
)


}


export default GuestBook;