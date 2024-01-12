import { useState, useEffect, useMemo } from "react";
import "./index.css";


function Themes() {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "primary"
	);
	const [font, setFont] = useState(localStorage.getItem("font") || "font1"); // Initialize the selected font state

	const themeColors = useMemo(() => {
		return {
			primary: "#1d4ed8",
			green: "#22c55e",
			red: "#b91c1c",
			black: "#1f2937",
		};
	}, []);

	const fonts = useMemo(() => {
		return {
			font1: "'Inter', system-ui, Avenir, sans-serif",
			font2: "'Lora','Times New Roman', Times, system-ui, serif",
			font3: "'Montserrat', system-ui, Avenir, sans-serif",
		};
	}, []);

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--color-primary",
			themeColors[theme]
		);
		document.documentElement.style.setProperty("--font-1", fonts[font]); // Update the font based on the selected font state
	}, [theme, themeColors, font, fonts]);

	const changeTheme = (newTheme) => {
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	const changeFont = (newFont) => {
		setFont(newFont);
		localStorage.setItem("font", newFont);
	};

	return (
		<div className="theme-container">
			<div className="theme-buttons">
				{Object.keys(themeColors).map((themeName) => (
					<button
						key={themeName}
						className={`theme-button theme-${themeName}`}
						onClick={() => changeTheme(themeName)}
						style={{ backgroundColor: themeColors[themeName] }}
					></button>
				))}
			</div>
			<div className="font-buttons">
				{Object.keys(fonts).map((fontName) => (
					<button
						key={fontName}
						className={`font-button font-${fontName}`}
						onClick={() => changeFont(fontName)} 
						style={{ fontFamily: fonts[fontName] }}
					>
						<b>Aa</b>
					</button>
				))}
			</div>
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
				<div className="general-info">
					<h1>{name}</h1>
					<div>
						<span className="phone-icon"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg></span>
						<p>{phone}</p>
					</div>
					<div>
						<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></span>
						<p>{email}</p>
					</div>
					<div>
						<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></span>
						<p>{address}</p>
					</div>
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
			<h2>Skills</h2>
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

