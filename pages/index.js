import { useRef, useState } from 'react';
import Feedback from './feedback';

function HomePage () {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const [ feedback, setFeedback ] = useState([]);

  const submitHandler = function (event) {
    event.preventDefault();
    
    const emailInputValue = emailInputRef.current.value;
    const feedbackInputValue = feedbackInputRef.current.value;

    fetch('/api/feedback', {
      method: 'POST',
      // must stringify for Next's parser to work in server side code
      body: JSON.stringify({ email: emailInputValue, feedback: feedbackInputValue }),
      // headers is meta data for response, must pass JSON value for content type so Next knows to attempt to parse
      headers: {
        'Content-Type': 'application/JSON'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
    .then(response => response.json())
    .then(data => setFeedback(data.feedback))
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" ref={feedbackInputRef}/>
        </div>
        <button>Submit Feedback</button>
      </form>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {
          feedback.map(item => <li>{item.feedback}</li>)
        }
      </ul>
    </div>
  )
}

export default HomePage;