import '../css/Home.css';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect } from 'react';
import ebconfig from '../ebconfig';




function Home() {
    return (
      <div className="App">
        <EasybaseProvider ebconfig={ebconfig}>
            <Notes />
            <NewNoteButton />
        </EasybaseProvider>
      </div>
    );
}






















function NewNoteButton() {
    const { Frame, sync } = useEasybase();
  
    const buttonStyle = {
      
    }

    const handleClick = () => {
        const newTitle = prompt("Please enter a title for your note");
        const newDescription = prompt("Please enter your description");
        
        Frame().push({
          name: newTitle,
          description: newDescription,
          createdat: new Date().toISOString()
        })
        
        sync();
    }

    return <button style={buttonStyle} onClick={handleClick}>📓 Add Note 📓</button>
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