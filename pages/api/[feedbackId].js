import { getFeedbackFilePath, parseFeedback } from './feedback'

export default function handler (req, res) {
  const feedbackId = req.query.feedbackId; //feedbackId matches dynamic file name
  const filePath = getFeedbackFilePath();
  const feedbackItems = parseFeedback(filePath);
  const selectedFeedback = feedbackItems.find( item => item.id === feedbackId );

  res.status(200).json({ feedback: selectedFeedback });
}