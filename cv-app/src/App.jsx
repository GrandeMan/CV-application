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
	const getDefaultState = (key, placeholder) => {
		const value = localStorage.getItem(key);
		return value || placeholder;
	};

	const [name, setName] = useState(getDefaultState("name", "Full Name"));
	const [email, setEmail] = useState(
		getDefaultState("email", "Your Email Address")
	);
	const [phone, setPhone] = useState(
		getDefaultState("phone", "Your Phone Number")
	);
	const [address, setAddress] = useState(
		getDefaultState("address", "Your Home Address")
	);
	const [isEditing, setIsEditing] = useState(false);
	const [saveTimer, setSaveTimer] = useState(null);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);

		// Save data to local storage
		localStorage.setItem("name", name === "Full Name" ? "" : name);
		localStorage.setItem(
			"email",
			email === "Your Email Address" ? "" : email
		);
		localStorage.setItem(
			"phone",
			phone === "Your Phone Number" ? "" : phone
		);
		localStorage.setItem(
			"address",
			address === "Your Home Address" ? "" : address
		);
	};

	useEffect(() => {
		if (saveTimer) {
			clearTimeout(saveTimer);
		}

		// Set a new timer to save data to local storage every 700ms
		const newSaveTimer = setTimeout(() => {
			// Save data to local storage
			localStorage.setItem("name", name === "Full Name" ? "" : name);
			localStorage.setItem(
				"email",
				email === "Your Email Address" ? "" : email
			);
			localStorage.setItem(
				"phone",
				phone === "Your Phone Number" ? "" : phone
			);
			localStorage.setItem(
				"address",
				address === "Your Home Address" ? "" : address
			);

			setSaveTimer(null);
		}, 700);

		setSaveTimer(newSaveTimer);

		return () => {
			if (saveTimer) {
				clearTimeout(saveTimer);
			}
		};
	}, [name, email, phone, address]);

	const renderInputField = (value, placeholder, onChange) => (
		<input
			type="text"
			value={value === placeholder ? "" : value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);

	return (
		<div>
			{isEditing ? (
				<div className="is-editing">
					{renderInputField(name, "Full Name", (e) =>
						setName(e.target.value)
					)}
					{renderInputField(phone, "Your Phone Number", (e) =>
						setPhone(e.target.value)
					)}
					{renderInputField(email, "Your Email Address", (e) =>
						setEmail(e.target.value)
					)}
					{renderInputField(address, "Your Home Address", (e) =>
						setAddress(e.target.value)
					)}
					<button className="save-btn" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			) : (
				<div>
					<h1>{name}</h1>
					<p>{phone}</p>
					<p>{email}</p>
					<p>{address}</p>
					<button className="edit-btn" onClick={handleEditClick}>
						Edit
					</button>
				</div>
			)}
		</div>
	);
}

function Summary() {
  const getDefaultState = (key, placeholder) => {
		const value = localStorage.getItem(key);
		return value || placeholder;
  };

  const [summary, setSummary] = useState(getDefaultState("summary", "Enter Summary. This is a summary of your skills and experience. It should be 2-3 sentences long."));
  const [isEditing, setIsEditing] = useState(false);
  const [saveTimer, setSaveTimer] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
		setIsEditing(false);

		//save data to local storage
		localStorage.setItem("summary", summary === "Enter Summary. This is a summary of your skills and experience. It should be 2-3 sentences long." ? "" : summary);

  };

  useEffect(() => {
		if (saveTimer) {
			clearTimeout(saveTimer);
		}

		//Set new timer to save data to local storage every 700ms
		const newSaveTimer = setTimeout(() => {
			//save data to local storage
			localStorage.setItem("summary", summary === "Enter Summary. This is a summary of your skills and experience. It should be 2-3 sentences long." ? "" : summary);

			setSaveTimer(null);
		}, 700);

		setSaveTimer(newSaveTimer);

		return () => {
			if (saveTimer) {
				clearTimeout(saveTimer);
			}
		};
  }, [summary]);

  const renderInputField = (value, placeholder, onChange) => (
		<textarea
			rows="10"
			cols="50"
			value={value === placeholder ? "" : value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);

  return (
		<div>
			<h2>Professional Summary</h2>
			{isEditing ? (
				<div className="is-editing">
					{renderInputField(
						summary,
						"Enter Summary. This is a summary of your skills and experience. It should be 2-3 sentences long.",
						(e) => setSummary(e.target.value)
					)}
					<button className="save-btn" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			) : (
				<div>
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

		if (skillsArray.length === 0) {
			skillsArray.push("Enter Skill");
		}
		return skillsArray;
	});

	// Function to create a placeholder for empty skills
	const createPlaceholderSkill = () => {
		return skills.length === 0 ? "Enter Skill" : "";
	};

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
			setEditedSkills([...editedSkills, createPlaceholderSkill()]);
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
			<h2>Your Skills</h2>
			{isEditing ? (
				<div className="is-editing">
					<form>
						{editedSkills.map((skill, index) => (
							<div className="skill" key={index}>
								<input
									type="text"
									value={skill === "Enter Skill" ? "" : skill}
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

	// Update local storage when education data changes
	useEffect(() => {
		localStorage.setItem("education", JSON.stringify(educationData));
	}, [educationData]);

	const renderInputField = (value, placeholder, onChange) => (
		<input
			type="text"
			value={value === placeholder ? "" : value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);

	const renderTextArea = (value, placeholder, onChange) => (
		<textarea
			rows="4"
			cols="50"
			value={value === placeholder ? "" : value}
			placeholder={placeholder}
			onChange={onChange}
		></textarea>
	);

	return (
		<div>
			<h2>Education</h2>
			{isEditing ? (
				<div>
					{educationData.map((item, index) => (
						<div className="is-editing" key={index}>
							{renderInputField(
								item.school,
								"Enter School",
								(e) => {
									const updatedData = [...educationData];
									updatedData[index].school = e.target.value;
									setEducationData(updatedData);
								}
							)}
							{renderInputField(
								item.completed,
								"Enter Date Completed",
								(e) => {
									const updatedData = [...educationData];
									updatedData[index].completed =
										e.target.value;
									setEducationData(updatedData);
								}
							)}
							{renderInputField(
								item.degree,
								"Enter Ceritificate/Degree",
								(e) => {
									const updatedData = [...educationData];
									updatedData[index].degree = e.target.value;
									setEducationData(updatedData);
								}
							)}
							{renderTextArea(
								item.description,
								"Enter a brief description of what you studied and your accomplishments",
								(e) => {
									const updatedData = [...educationData];
									updatedData[index].description =
										e.target.value;
									setEducationData(updatedData);
								}
							)}
							<hr></hr>
						</div>
					))}
					<button className="save-btn" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			) : (
				<div>
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
							{index < educationData.length - 1 && <hr />}
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

	// Update local storage when experience data changes
	useEffect(() => {
		localStorage.setItem("experience", JSON.stringify(experienceData));
	}, [experienceData]);

	const renderInputField = (value, placeholder, onChange) => (
		<input
			type="text"
			value={value === placeholder ? "" : value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);

	const renderTextArea = (value, placeholder, onChange) => (
		<textarea
			rows="4"
			cols="50"
			value={value === placeholder ? "" : value}
			placeholder={placeholder}
			onChange={onChange}
		></textarea>
	);

	return (
		<div>
			<h2>Experience</h2>
			{isEditing ? (
				<div>
					{experienceData.map((item, index) => (
						<div className="is-editing" key={index}>
							{renderInputField(
								item.company,
								"Enter Company",
								(e) => {
									const updatedData = [...experienceData];
									updatedData[index].company = e.target.value;
									setExperienceData(updatedData);
								}
							)}
							{renderInputField(
								item.startDate,
								"Start Date",
								(e) => {
									const updatedData = [...experienceData];
									updatedData[index].startDate =
										e.target.value;
									setExperienceData(updatedData);
								}
							)}
							{renderInputField(item.endDate, "End Date", (e) => {
								const updatedData = [...experienceData];
								updatedData[index].endDate = e.target.value;
								setExperienceData(updatedData);
							})}
							{renderInputField(
								item.position,
								"Enter Position",
								(e) => {
									const updatedData = [...experienceData];
									updatedData[index].position =
										e.target.value;
									setExperienceData(updatedData);
								}
							)}
							{renderTextArea(
								item.description,
								"Enter Description",
								(e) => {
									const updatedData = [...experienceData];
									updatedData[index].description =
										e.target.value;
									setExperienceData(updatedData);
								}
							)}
							<hr></hr>
						</div>
					))}
					<button className="save-btn" onClick={handleSaveClick}>
						Save
					</button>
				</div>
			) : (
				<div>
					{experienceData.map((item, index) => (
						<div key={index}>
							<div className="item-head">
								<p>{item.company}</p>
								<p>
									{item.startDate} - {item.endDate}
								</p>
							</div>
							<p>{item.position}</p>
							<p className="item-desc">
								<i>{item.description}</i>
							</p>
							{index < experienceData.length - 1 && <hr />}
							{index < experienceData.length - 1 && <br />}
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

function Print() {
  return (
    <div className="print">
      <button onClick={() => window.print()}><b>Save</b></button>
    </div>
  )
}

export { Themes, GeneralInfo, Summary, Skills, Education, Experience, Print}

