import { useState } from 'react'

function App() {
  const [userValue, setUserValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
 
  const onSubmit = async (e)=> {
    e.preventDefault()
  

    const message = {role: "user", content: userValue};

    try {
      const response = await fetch("http://localhost:8000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message),
      })

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request no gree go: ${response.status}`)
      }

      setChatLog((current) => [...current, message, data.completion])
      setUserValue("");

    } catch (error) {
      console.log(error);
    }
  
  } 
    return (
    <div className="main">
      <h1>PidginGPT</h1>
      <p>Developed by Kense</p>
      <div className="log">
        <ul>
          {chatLog.map((chat, idx) =>
            chat.role === "user" ? (<li key={idx}>You<span>{chat.content}</span></li>) : (<li key={idx}>PidginGPT<span>{chat.content}</span></li>)
          )}
        </ul>
      </div>
      <form onSubmit={onSubmit}>
        
        <input type="text" name="prompt" placeholder={chatLog.length > 0 ? "" : "👋🏾Say Hello..."} value={userValue} onChange={(e) => setUserValue(e.target.value)} />
        <button type='submit'>Ask</button>
      </form>
    </div>
  )
}
export default App