import '../css/Home.css';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect } from 'react';
import ebconfig from '../ebconfig';
import React from 'react'
import  '../../node_modules/semantic-ui-react';
import { Button,Icon,Label } from 'semantic-ui-react'
import background from '../back.png';

function Head(){

    let now = new Date();
    let status =now.getHours() > 17 ? 'Good Evening,' : now.getHours() > 12 ? 'Good Afternoon,' :  'Good Morning,';
    status+=' House 41.';
    let time = now.getHours()>12 ? (now.getHours()-12) : now.getHours();
    time+=':'+now.getMinutes();
    time+=+now.getHours()>12 ? 'PM' : 'AM';
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = days[now.getDay()];
    day +=', '+months[now.getMonth()] +' '+ now.getDate() + ' '+ time;
    
    //
    return (
        <div className='head'>
            <h2>{status}</h2>
            <h3>{day}</h3>
        </div>
    )
}

function Chores(){
    const { Frame, sync, configureFrame } = useEasybase();
    console.log("hi");
    useEffect(() => {
      configureFrame({ tableName: "TODOS", limit: 10 });
      sync();
    }, []);
  

    return (
      <div className='chores' id='chores'>
          <h2>Current ToDo's</h2>
        {Frame().map(ele => 
        
          <div className='choreCard' id='choreCard'>
            <h3>{ele.title}</h3>
            <p>Importance: {ele.importance}</p>
            <p>Created at: {formatDate(ele.createdat)}</p>
            <p>Due by: {formatDate(ele.due)}</p>
            <p>Assigned To: {ele.assignedto}</p>
            <p>Creator: {ele.creator}</p>
          </div>
        )}
      </div>
    )
}

function formatDate (now){
    now = new Date(now);
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = days[now.getDay()];
    day +=', '+months[now.getMonth()] +' '+ now.getDate();
    return day;
}
function Home() {
    return (
      <div className="App">
        <EasybaseProvider ebconfig={ebconfig}>
            <Head/>
            <Chores/>
            <NewNoteButton />
            <DeleteNoteButtton />
        </EasybaseProvider>
      </div>
    );
}

function DeleteNoteButtton (){
    const { Frame, sync } = useEasybase();
  
    const handleClick = () => {
       
        Frame().pop();
       
        
        
        sync();
    }

    return <button onClick={handleClick}>📓 Delete Note 📓</button>
}

function NewNoteButton() {
    const { Frame, sync } = useEasybase();
  
    const handleClick = () => {
        const newTitle = prompt("Please enter a title: ");
        const newImportance = prompt("Please enter importance level (1-5): ");

        const newDue = '2021-04-07';
        const newCreator = prompt("Please enter a creator: ");
        const newAssigned = prompt("Please enter a assigner: ");

        Frame().push({
          title: newTitle,
          importance: newImportance,
          createdat: new Date().toISOString(),
          due: new Date(newDue),
          creaotr: newCreator,
          assignedto: newAssigned
        })
        
        sync();
    }

    return <button onClick={handleClick}>📓 Add Note 📓</button>
}

function Notes() {
    const { Frame, sync, configureFrame } = useEasybase();
    console.log("hi");
    useEffect(() => {
      configureFrame({ tableName: "TODOS", limit: 10 });
      sync();
    }, []);
  
    const noteRootStyle = {
      border: "2px #0af solid",
      borderRadius: 9,
      margin: 20,
      backgroundColor: "#efefef",
      padding: 6,
      marginTop:0
    };
  
    return (
      <div style={{ width: 400,margin:'auto'}}>
        {Frame().map(ele => 
          <div style={noteRootStyle}>
            <h3>{ele.name}</h3>
            <p>{ele.Description}</p>
            <small>{String(ele.createdat).slice(0, 10)}</small>
          </div>
        )}
      </div>
    )
  }

export default Home;