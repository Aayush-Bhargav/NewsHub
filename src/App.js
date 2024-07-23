import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Navbar from './components/Navbar';
import News from './components/News';
import Search from './components/Search';

function App() {
  const apiKey = process.env.REACT_APP_NEWS_APIKEY1;//get the api key from .env file
  const [category, setCategory] = useState(''); //initially let the category be equal to an empty string
  console.log(category);
  const [progress, setProgress] = useState(0); //initially set the progress to 0
  const [query, setQuery] = useState(''); //query is also initialized to empty string initially
  const handleSubmit = (keyword) => { //function to handle form submission that is used in the navbar whenver someone clicks on one of the options in the navbar
    console.log("keyword:" + keyword);
    setQuery(keyword);
  }
  const handleProgress = (progress) => { //function to update progress
    setProgress(progress)
  }
  const changeCategory = (category) => { //function to update category
    console.log('hey !')
    setCategory(category);

  }
  return (
    <Router>
      <Navbar title="News Hub" changeCategory={changeCategory} handleSubmit={handleSubmit} />
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}

      />
      {/* defining what to render when the category changes */}
      {query === '' ? (<Routes>
        <Route exact path="/" element={<News handleProgress={handleProgress} key="general" pageSize={9} apiKey={apiKey} category="general" defaultUrl={require('./Images/generalNewsDefault.jpeg')} />} />
        <Route exact path="/sports" element={<News handleProgress={handleProgress} key="sports" pageSize={9} apiKey={apiKey} category="sports" defaultUrl={require('./Images/sportsDefault.jpeg')} />} />
        <Route exact path="/entertainment" element={<News handleProgress={handleProgress} key="entertainment" pageSize={9} apiKey={apiKey} category="entertainment" defaultUrl={require('./Images/entertainmentDefault.jpeg')} />} />
        <Route exact path="/business" element={<News handleProgress={handleProgress} key="business" pageSize={9} apiKey={apiKey} category="business" defaultUrl={require('./Images/businessDefault.jpeg')} />} />
        <Route exact path="/health" element={<News handleProgress={handleProgress} key="health" pageSize={9} apiKey={apiKey} category="health" defaultUrl={require('./Images/healthDefault.jpeg')} />} />
        <Route exact path="/science" element={<News handleProgress={handleProgress} key="science" pageSize={9} apiKey={apiKey} category="science" defaultUrl={require('./Images/scienceDefault.png')} />} />
        <Route exact path="/technology" element={<News handleProgress={handleProgress} key="technology" pageSize={9} apiKey={apiKey} category="technology" defaultUrl={require('./Images/technologyDefault.jpeg')} />} />
      </Routes>) : (<Search query={query} handleProgress={handleProgress} key={query} pageSize={9} apiKey={apiKey}  defaultUrl={require('./Images/generalNewsDefault.jpeg')} />)
      }



    </Router>
  );
}

export default App;
