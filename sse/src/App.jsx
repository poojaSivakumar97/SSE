import { useState, useEffect } from "react";

const App = () => {
  const [comments, setCommnets] = useState([]);
  useEffect(() => {
    // browserapi -eventSource will create a live persisent connection to the url
    const eventSource = new EventSource("http://localhost:3001/events");

    eventSource.onmessage = (event) => {
      const comment = JSON.parse(event.data);
      if (comment.comment === "END") {
        eventSource.close();
      }
      setCommnets((prevData) => [comment, ...prevData]);
    };
    eventSource.onerror = (err) => {
      console.log(err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div>
      <h2>Live Commentary</h2>
      {comments.map((c) => {
        return <p key={c.id}>{c.comment}</p>;
      })}
    </div>
  );
};

export default App;
