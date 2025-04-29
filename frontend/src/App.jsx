
import {React, useState} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import QuizPageOne from './components/QuizPageOne'
import QuizPageTwo from './components/QuizPageTwo'

import {Routes,Route} from 'react-router-dom'
import DashBoard from './components/DashBoard'
import Sidebar from './components/Sidebar'
import QuizPageThree from './components/QuizPageThree'
import Nouns from './components/Nouns'
import QuizPageFour from './components/QuizPageFour'
import Result from './components/Result'
import Statements from './components/Statements'
import StatementThree from './components/StatementThree'
import StatementFour from './components/StatementFour'
import StatementResult from './components/StatementResult'
function App() {


  return (
    <>
     
     <Routes>
      <Route path="/" element={<Login/>}/>
      
      <Route path="/Home" element={<Home/>}/>
      <Route path='/quizone' element={<QuizPageOne/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/quiztwo' element={<QuizPageTwo/>}/>
      <Route path='/quizthree' element={<QuizPageThree/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>  
      <Route path='/sidebar' element={<Sidebar/>}/>   
      <Route path='/quizthree' element={<QuizPageThree/>}/>
      <Route path='/nouns' element={<Nouns/>}/>
      <Route path='/quizfour' element={<QuizPageFour/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/statements' element={<Statements/>}/>
      <Route path='/quizthrees' element={<StatementThree/>}/>
      <Route path='/quizfours' element={<StatementFour/>}/>
      <Route path='/results' element={<StatementResult/>}/>
     </Routes>
     
    </>
  )
}

export default App
