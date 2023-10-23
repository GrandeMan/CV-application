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
	const initialData = [
		{
			school: "Enter School",
			degree: "Enter Degree",
			graduation: "Enter Graduation Date",
			description:
				"Enter a brief description of what you studied and your accomplishments",
		},
	];
	const [educationData, setEducationData] = useState(initialData);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
	};

	const handleDeleteClick = (index) => {
		if (educationData.length > 1) {
			const updatedData = [...educationData];
			updatedData.splice(index, 1);
			setEducationData(updatedData);
		}
	};

	const handleAddClick = () => {
		setEducationData([...educationData, initialData[0]]);
	};

	return (
		<div>
			{isEditing ? (
				<div>
					{educationData.map((item, index) => (
						<div key={index}>
							<input
								type="text"
								value={item.school}
								onChange={(e) => {
									const updatedData = [...educationData];
									updatedData[index].school = e.target.value;
									setEducationData(updatedData);
								}}
							/>
							<input
								type="text"
								value={item.degree}
								onChange={(e) => {
									const updatedData = [...educationData];
									updatedData[index].degree = e.target.value;
									setEducationData(updatedData);
								}}
							/>
							<input
								type="text"
								value={item.graduation}
								onChange={(e) => {
									const updatedData = [...educationData];
									updatedData[index].graduation =
										e.target.value;
									setEducationData(updatedData);
								}}
							/>
							<input
								type="text"
								value={item.description}
								onChange={(e) => {
									const updatedData = [...educationData];
									updatedData[index].description =
										e.target.value;
									setEducationData(updatedData);
								}}
							/>
						</div>
					))}
					<button className="save-btn" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			) : (
				<div>
					<h2>Education</h2>
					{educationData.map((item, index) => (
						<div key={index}>
							<p>{item.school}</p>
							<p>{item.degree}</p>
							<p>{item.graduation}</p>
							<p>{item.description}</p>
							<button
								className="edit-btn"
								onClick={handleEditClick}
							>
								Edit
							</button>
							{educationData.length > 1 ? (
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
							<button
								className="add-btn"
								onClick={handleAddClick}
							>
								Add
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
function Experience() {
	const initialData = [
		{
			company: "Enter Company",
			position: "Enter Position",
			startDate: "Enter Start Date",
			endDate: "Enter End Date",
			description: "Enter Description",
		},
	];
	const [experienceData, setExperienceData] = useState(initialData);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
	};

	const handleDeleteClick = (index) => {
		if (experienceData.length > 1) {
			const updatedData = [...experienceData];
			updatedData.splice(index, 1);
			setExperienceData(updatedData);
		}
	};

	const handleAddClick = () => {
		setExperienceData([...experienceData, initialData[0]]);
	};

	return (
		<div>
			{isEditing ? (
				<div>
					{experienceData.map((item, index) => (
						<div key={index}>
							<input
								type="text"
								value={item.company}
								onChange={(e) => {
									const updatedData = [...experienceData];
									updatedData[index].company = e.target.value;
									setExperienceData(updatedData);
								}}
							/>
							<input
								type="text"
								value={item.position}
								onChange={(e) => {
									const updatedData = [...experienceData];
									updatedData[index].position =
										e.target.value;
									setExperienceData(updatedData);
								}}
							/>
							<input
								type="text"
								value={item.startDate}
								onChange={(e) => {
									const updatedData = [...experienceData];
									updatedData[index].startDate =
										e.target.value;
									setExperienceData(updatedData);
								}}
							/>
							<input
								type="text"
								value={item.endDate}
								onChange={(e) => {
									const updatedData = [...experienceData];
									updatedData[index].endDate = e.target.value;
									setExperienceData(updatedData);
								}}
							/>
							<input
								type="text"
								value={item.description}
								onChange={(e) => {
									const updatedData = [...experienceData];
									updatedData[index].description =
										e.target.value;
									setExperienceData(updatedData);
								}}
							/>
						</div>
					))}
					<button className="save-btn" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			) : (
				<div>
					<h2>Experience</h2>
					{experienceData.map((item, index) => (
						<div key={index}>
							<p>{item.company}</p>
							<p>{item.position}</p>
							<p>{item.startDate}</p>
							<p>{item.endDate}</p>
							<p>{item.description}</p>
							<button
								className="edit-btn"
								onClick={handleEditClick}
							>
								Edit
							</button>
							{experienceData.length > 1 ? (
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
							<button
								className="add-btn"
								onClick={handleAddClick}
							>
								Add
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export { GeneralInfo, Summary, Skills, Education, Experience}
