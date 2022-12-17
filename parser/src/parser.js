import React, { useState } from "react";

const ParseResumeForm = () => {
	const [formData, setFormData] = useState(null);
	const [parsedData, setParsedData] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch("https://jobs.lever.co/parseResume", {
				method: "POST",
				headers: {
					Origin: "https://jobs.lever.co",
					Referer: "https://jobs.lever.co/parse",
				},
				mode: "cors",
				body: formData,
			});
			const parsedData = await response.json();
			setParsedData(parsedData);
		} catch (error) {
			console.error(error);
		}
	};

	const handleFileChange = (event) => {
		setFormData(new FormData(event.target.form));
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="resume">Select a resume to parse:</label>
				<input type="file" name="resume" onChange={handleFileChange} />
				<button type="submit">Parse Resume</button>
			</form>
			{parsedData && (
				<div>
					<h2>Parsed Data</h2>
					<pre>{JSON.stringify(parsedData, null, 2)}</pre>
				</div>
			)}
		</>
	);
};

export default ParseResumeForm;
