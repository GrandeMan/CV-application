import { useState, useEffect, useMemo } from "react";
import "./index.css";

function Themes() {
	const [theme, setTheme] = useState("primary");

	const themeColors = useMemo(() => {
		return {
			primary: "#535bf2",
			green: "#00bfa5",
			red: "#ff5252",
			black: "#1a1a1a",
		};
	}, []);

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--color-primary",
			themeColors[theme]
		);
	}, [theme, themeColors]);

	const changeTheme = (newTheme) => {
		setTheme(newTheme);
	};

	return (
		<div className="theme-buttons">
			{Object.keys(themeColors).map((themeName) => (
				<button
					key={themeName}
					className={`theme-button theme-${themeName}`}
					onClick={() => changeTheme(themeName)}
					style={{ backgroundColor: themeColors[themeName] }}
				>
				</button>
			))}
		</div>
	);
}


function GeneralInfo() {
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
				<div className='is-editing'>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<button className="save-btn" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			) : (
				<div>
					<h1>{name}</h1>
					<p> {phone}</p>
					<p> {email}</p>
					<p> {address}</p>
					<button className="edit-btn" onClick={handleEditClick}>
						Edit
					</button>
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
				<div className="is-editing">
					<textarea
            rows="10"
            cols="50"
            value={summary}
						onChange={(e) => setSummary(e.target.value)}
          >
					</textarea>
					<button className="save-btn" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			) : (
				<div>
					<h2>Professional Summary</h2>
					<p className="summary">{summary}</p>
					<button className="edit-btn" onClick={handleEditClick}>
						Edit
					</button>
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
				<div className="is-editing">
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
					<ul className="list">
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
			completed: "Enter Date Completed",
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
						<div className="is-editing" key={index}>
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
								value={item.completed}
								onChange={(e) => {
									const updatedData = [...educationData];
									updatedData[index].completed =
										e.target.value;
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
							<textarea
								type="text"
								rows="4"
								cols="50"
								value={item.description}
								onChange={(e) => {
									const updatedData = [...educationData];
									updatedData[index].description =
										e.target.value;
									setEducationData(updatedData);
								}}
							></textarea>
							<button
								className="save-btn"
								onClick={handleSaveClick}
							>
								Save
							</button>
						</div>
					))}
				</div>
			) : (
				<div>
					<h2>Education</h2>
					{educationData.map((item, index) => (
						<div key={index}>
							<div className="item-head">
								<p>{item.school}</p>
								<p>{item.completed}</p>
							</div>
							<p>{item.degree}</p>
							<p className="item-desc">
								<i>{item.description}</i>
							</p>
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
							<br></br>
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
			startDate: "Start Date",
			endDate: "End Date",
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
						<div className="is-editing" key={index}>
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
								value={item.position}
								onChange={(e) => {
									const updatedData = [...experienceData];
									updatedData[index].position =
										e.target.value;
									setExperienceData(updatedData);
								}}
							/>
							<textarea
								type="text"
								rows="4"
								cols="50"
								value={item.description}
								onChange={(e) => {
									const updatedData = [...experienceData];
									updatedData[index].description =
										e.target.value;
									setExperienceData(updatedData);
								}}
							></textarea>
							<button
								className="save-btn"
								onClick={handleSaveClick}
							>
								Save
							</button>
						</div>
					))}
				</div>
			) : (
				<div>
					<h2>Experience</h2>
					{experienceData.map((item, index) => (
						<div key={index}>
							<div className="item-head">
								<p>{item.company}</p>
								<p>
									{item.startDate} - {item.endDate}
								</p>
							</div>
							<p>
								<p>{item.position}</p>
							</p>
							<p className="item-desc">
								<i>{item.description}</i>
							</p>
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
							<br></br>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function Print() {
  return (
    <div className="print">
      <button onClick={() => window.print()}><b>Save</b></button>
    </div>
  )
}

export { Themes, GeneralInfo, Summary, Skills, Education, Experience, Print}
