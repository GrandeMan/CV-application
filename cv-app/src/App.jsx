import { useState } from 'react'


function GeneralInfo() {
  const [occupation, setOccupation] = useState('Enter Occupation')
  const [name, setName] = useState('Your Name')
  const [email, setEmail] = useState('example@website.com')
  const [phone, setPhone] = useState('Enter Phone Number')
  const [address, setAddress] = useState('1 Street, City, State, Zip')

  return(
  <>
  </>
  )
}

function Summary() {
  const [summary, setSummary] = useState('Enter Summary')

  return(
  <>
  </>
  )
}

function Skills() {
  const [skill, setSkill] = useState('Enter Skill')

  return(
  <>
  </>
  )
}

function Education() {
  const [school, setSchool] = useState('Enter School')
  const [degree, setDegree] = useState('Enter Degree')
  const [graduation, setGraduation] = useState('Enter Graduation Date')

  return(
  <>
  </>
  )
}

function Experience() {
  const [company, setCompany] = useState('Enter Company')
  const [position, setPosition] = useState('Enter Position')
  const [startDate, setStartDate] = useState('Enter Start Date')
  const [endDate, setEndDate] = useState('Enter End Date')
  const [description, setDescription] = useState('Enter Description')

  return(
  <>
  </>
  )
}


export { GeneralInfo, Summary, Skills, Education, Experience}
