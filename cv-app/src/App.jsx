import { useState } from 'react'
import './index.css'


function GeneralInfo() {
	const [occupation, setOccupation] = useState("Enter Occupation");
	const [name, setName] = useState("Your Name");
	const [email, setEmail] = useState("example@website.com");
	const [phone, setPhone] = useState("Your number");
	const [address, setAddress] = useState("1 Street, City, State, Zip");
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
	};

	return (
		<div>
			{isEditing ? (
				<div>
					<input
						type="text"
						value={occupation}
						onChange={(e) => setOccupation(e.target.value)}
					/>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="text"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<button className='save-btn' onClick={handleSaveClick}>Save</button>
				</div>
			) : (
				<div>
					<h1>{occupation}</h1> 
					<p> {name}</p>
					<p> {email}</p>
					<p> {phone}</p>
					<p> {address}</p>
					<button className='edit-btn' onClick={handleEditClick}>Edit</button>
				</div>
			)}
		</div>
	);
}

function Summary() {
  const [summary, setSummary] = useState('Enter Summary. This is a summary of your skills and experience. It should be 2-3 sentences long.');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
		<div>
			{isEditing ? (
				<div>
					<input
						type="text"
						value={summary}
						onChange={(e) => setSummary(e.target.value)}
					/>
					<button className='save-btn' onClick={handleSaveClick}>Save</button>
				</div>
			) : (
				<div>
					<h2>Professional Summary</h2>
					<p>{summary}</p>
					<button className='edit-btn' onClick={handleEditClick}>Edit</button>
				</div>
			)}
		</div>
  );
}

function Skills() {
	const [skills, setSkills] = useState(["Enter Skill"]);
	const [isEditing, setIsEditing] = useState(false);
	const [newSkill, setNewSkill] = useState("");

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		const updatedSkills = [...skills];
		const skillIndex = updatedSkills.findIndex((s) => s === "Enter Skill");
		updatedSkills[skillIndex] = newSkill || "Enter Skill";
		setSkills(updatedSkills);
		setNewSkill("");
	};

	const handleDeleteClick = (index) => {
		if (skills.length > 1) {
			const updatedSkills = [...skills];
			updatedSkills.splice(index, 1);
			setSkills(updatedSkills);
		}
	};

	const handleAddClick = () => {
		if (skills.length < 6) {
			setSkills([...skills, "Enter Skill"]);
		}
	};

	return (
		<div>
			{isEditing ? (
				<div>
					<input
						type="text"
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
					/>
					<button className="save-btn" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			) : (
				<div>
					<h2>Skills</h2>
					<ul>
						{skills.map((skill, index) => (
							<div className="skill-item" key={index}>
								<li>{skill}</li>
								<button
									className="edit-btn"
									onClick={handleEditClick}
								>
									Edit
								</button>
								{skills.length > 1 ? (
									<button
										className="delete-btn"
										onClick={() => handleDeleteClick(index)}
									>
										Delete
									</button>
								) : (
									<button className="delete-btn" disabled>
										Delete
									</button>
								)}
								{skills.length < 6 ? (
									<button
										className="add-btn"
										onClick={handleAddClick}
									>
										Add
									</button>
								) : (
									<button className="add-btn" disabled>
										Add
									</button>
								)}
							</div>
						))}
					</ul>
				</div>
			)}
		</div>
	);
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
