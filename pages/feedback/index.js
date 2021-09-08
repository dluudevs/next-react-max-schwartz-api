import { useState } from "react";
import { getFeedbackFilePath, parseFeedback } from "../api/feedback";

function FeedbackPage({ feedbackItems }) {
  const [selectedFeedback, setSelectedFeedback] = useState();

  const showDetailsHandler = (id) => {
    console.log(id)
    fetch(`api/${id}`)
      .then((response) => response.json())
      .then((data) => setSelectedFeedback(data.feedback));
  };

  return (
    <>
      {selectedFeedback && <p>{selectedFeedback.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <>
            <li>
              {item.feedback}
              {/* no matter how function is called, function gets passed these arguments. this is not binded so null is passed as first argument here */}
              <button onClick={showDetailsHandler.bind(null, item.id)}>
                Show Details
              </button>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = getFeedbackFilePath();
  const data = parseFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
