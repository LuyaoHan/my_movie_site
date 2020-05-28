/*
Custom React Hooks
*/
import {useState} from "react"; //react hooks generally have an internal state

/*
How useForm works:
it takes in an input callback(in GuestBook it is the function "submit"), for this hook to use

two functions handleTextChange/handleSubmit and "Values" objects are passed back to the GuestBook
and in GuestBook they are destructured like a struct

*/
const useForm = (callback) =>{  //callback: passed from GuestBook(main form) to update values
                                              
    
    
    //declare way to set values
    const [values,setValues] = useState({guestName:"",description:"",message:"",isPrivate:false,email:"",date:""}) //pulling the tuple to values, and setValues is the setter function
    //new state for errors
    const [errors,setErrors] = useState({guestName:"",description:"",message:"",isPrivate:"",email:"",hasError:""}); //just like declaring values and its setter setValues
    var currYear = (new Date().getFullYear());
    var currMonth = (new Date().getMonth()+1);
    var currDay = (new Date().getDate());  //Current Date
    console.log("date is: " + currMonth + " " + currDay)
    //declare way on change event. Once the input tab is clicked, handler function receives an event.
    const handleTextChange = event =>{
        //DEBUG MESSAGE: grab target(of what you are typing in)
        console.log(event.target.name,"value is:" + event.target.value)
   
        setValues({
          ...values,         //'...' is the spread operator that iterate through objects declared in "values"
          [event.target.name]: event.target.value, //set name equal to the key
          });
      };
       


      //Submission function
      const handleSubmit = event =>{  
        console.log("enter submit callback")
        event.preventDefault(); //prevent the default behavior so that the browser doesn't refresh itself
                callback();            
        }

      //returns values that will be used in GuestBook
      return{
            handleTextChange,       //return setter callback function
            handleSubmit,
            setValues,            //function method
            values,              //return set values
      }
};

export default useForm; //export so that in GuestBook/other form page can destructure the returns