import { useState, useEffect, useMemo } from "react";
import "./index.css";

function Themes() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "primary");

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
		localStorage.setItem("theme", newTheme);
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
	const [name, setName] = useState(localStorage.getItem("name") || "Full Name");
	const [email, setEmail] = useState(localStorage.getItem("email") || "Your Email Address");
	const [phone, setPhone] = useState(localStorage.getItem("phone") || "Your Phone Number");
	const [address, setAddress] = useState(localStorage.getItem("address") || "Your Home Address");
	const [isEditing, setIsEditing] = useState(false);
	const [saveTimer, setSaveTimer] = useState(null);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);

		//save data to local storage
		localStorage.setItem("name", name);
		localStorage.setItem("email", email);
		localStorage.setItem("phone", phone);
		localStorage.setItem("address", address);
	};

	useEffect(() => {
		if(saveTimer) {
			clearTimeout(saveTimer);
		}

		//Set new timer to save data to local storage every 700ms
		const newSaveTimer = setTimeout(() => {
			//save data to local storage
			localStorage.setItem("name", name);
			localStorage.setItem("email", email);
			localStorage.setItem("phone", phone);
			localStorage.setItem("address", address);

			setSaveTimer(null);
		}, 700);

		setSaveTimer(newSaveTimer);

		return () => {
			if(saveTimer) {
				clearTimeout(saveTimer);
			}
		};
	}, [name, email, phone, address ]);



	return (
		<div>
			{isEditing ? (
				<div className='is-editing'>
					<input
						type="text"
						value={name}
						placeholder="Full Name"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						value={phone}
						placeholder="Your Phone Number"
						onChange={(e) => setPhone(e.target.value)}
					/>
					<input
						type="text"
						value={email}
						placeholder="Your Email Address"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="text"
						value={address}
						placeholder="Your Home Address"
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
  const [summary, setSummary] = useState(localStorage.getItem("summary")||'Enter Summary. This is a summary of your skills and experience. It should be 2-3 sentences long.');
  const [isEditing, setIsEditing] = useState(false);
  const [saveTimer, setSaveTimer] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
		setIsEditing(false);

		//save data to local storage
		localStorage.setItem("summary", summary);
  };

  useEffect(() => {
		if (saveTimer) {
			clearTimeout(saveTimer);
		}

		//Set new timer to save data to local storage every 700ms
		const newSaveTimer = setTimeout(() => {
			//save data to local storage
			localStorage.setItem("summary", summary);

			setSaveTimer(null);
		}, 700);

		setSaveTimer(newSaveTimer);

		return () => {
			if (saveTimer) {
				clearTimeout(saveTimer);
			}
		};
  }, [summary]);


  return (
		<div>
			{isEditing ? (
				<div className="is-editing">
					<textarea
            rows="10"
            cols="50"
            value={summary}
			placeholder="Enter Summary. This is a summary of your skills and experience. It should be 2-3 sentences long."
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
	const [skills, setSkills] = useState(() => {
		const storedSkills = localStorage.getItem("skills");
		const skillsArray = storedSkills ? JSON.parse(storedSkills) : [];

		if(skillsArray.length === 0) {
			skillsArray.push("Enter Skill");
		}
		return skillsArray;
	});
	const [isEditing, setIsEditing] = useState(false);
	const [editedSkills, setEditedSkills] = useState(skills.slice(0, 6));

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		setSkills(editedSkills);
	};

	const handleSkillChange = (index, value) => {
		const updatedSkills = [...editedSkills];
		updatedSkills[index] = value;
		setEditedSkills(updatedSkills);
	};

	const handleAddSkill = () => {
		if (editedSkills.length < 6) {
			setEditedSkills([...editedSkills, ""]);
		}
	};

	const handleRemoveSkill = (index) => {
		if (editedSkills.length > 1) {
			const updatedSkills = [...editedSkills];
			updatedSkills.splice(index, 1);
			setEditedSkills(updatedSkills);
		}
	};

	// Update local storage when skills change
	useEffect(() => {
		localStorage.setItem("skills", JSON.stringify(skills));
	}, [skills]);

	return (
		<div>
			{isEditing ? (
				<div className="is-editing">
					<form>
						{editedSkills.map((skill, index) => (
							<div className="skill" key={index}>
								<input
									type="text"
									value={skill}
									placeholder="Enter Skill"
									onChange={(e) =>
										handleSkillChange(index, e.target.value)
									}
								/>
								<button
									type="button"
									onClick={() => handleRemoveSkill(index)}
									disabled={editedSkills.length === 1}
								>
									-
								</button>
								<button
									type="button"
									onClick={handleAddSkill}
									disabled={editedSkills.length === 6}
								>
									+
								</button>
							</div>
						))}
					</form>
					<button className="save-btn" onClick={handleSaveClick}>
						Save Skills
					</button>
				</div>
			) : (
				<div>
					<h2>Your Skills</h2>
					<ul className="list">
						{skills.map((skill, index) => (
							<div className="skill-item" key={index}>
								<li>{skill}</li>
							</div>
						))}
					</ul>
					<button className="edit-btn" onClick={handleEditClick}>
						Edit Skills
					</button>
				</div>
			)}
		</div>
	);
}

function Education() {
	const initialData = [
		{
			school: "Enter School",
			degree: "Enter Ceritificate/Degree",
			completed: "Enter Date Completed",
			description:
				"Enter a brief description of what you studied and your accomplishments",
		},
	];
	const [educationData, setEducationData] = useState(() => {
		const storedEducation = localStorage.getItem("education");
		return storedEducation ? JSON.parse(storedEducation) : initialData;
	});
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

	//Update local storage when education data changes
	useEffect(() => {
		localStorage.setItem("education", JSON.stringify(educationData));
	}, [educationData]);

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
	const [experienceData, setExperienceData] = useState(() => {
		const storedExperience = localStorage.getItem("experience");
		return storedExperience ? JSON.parse(storedExperience) : initialData;
	});

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

	//Update local storage when experience data changes
	useEffect(() => {
		localStorage.setItem("experience", JSON.stringify(experienceData));
	}, [experienceData]);

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

