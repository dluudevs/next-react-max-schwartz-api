// this code will only run on the server, similar to getStaticProps and getServerSideProps
// files inside of api are executed by Node
import path from 'path';
import fs from 'fs';

const getFeedbackFilePath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

const parseFeedback = ( filePath ) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

const handler = (req, res) => { 
  if ( req.method === 'POST') {
    // { email: 'delvv@gmail.com', feedback: 'my feedback' }
    // Next automatically parses body into JSON - front end must set headers in content-type to application/json for this to work
    const { email, feedback } = req.body;
    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    }
    const filePath = getFeedbackFilePath();
    // read file synchronously
    const data = parseFeedback(filePath);
    data.push(newFeedback)
    // wrte file synchronously (overwrites all the contents, that's why we read the file first). Must stringify or javascript object will show up as 'object' in .json
    fs.writeFileSync(filePath, JSON.stringify(data));
    // send back success message with data
    res.status(200).json({ message: 'Data submitted', feedback: newFeedback })
  } else {
    const filePath = getFeedbackFilePath();
    const data = parseFeedback(filePath);
    // send back
    res.json({ feedback: data } )
  }
}

export default handler;
