import React, { useState } from "react";
import Styles from "./App.module.scss";
import Button from "@mui/material/Button";
import axios from "axios";

function App() {
	const [loading, setLoading] = useState<Boolean>(false);
	const [activity, setActivity] = useState<string>("");
	const [type, setType] = useState<string>("education");
	const [accessibility, setAccessibility] = useState<string>("");
	const [people, setPeople] = useState<string>("");

	const getTask = async () => {
		setLoading(true);
		try {
			if(accessibility || people){
				const result = await axios({
					method: "get",
					url: `http://www.boredapi.com/api/activity?type=${type}&accessibility=${
						Number(accessibility) / 10
					}&participants=${people}`,
				});
				setActivity(result.data.activity);
				alert(result.data.activity);
			}else{
				alert("Fill the Details first!");
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const getRandom = async () => {
		setLoading(true);
		try {
			const result = await axios({
				method: "get",
				url: `https://www.boredapi.com/api/activity`,
			});
			setActivity(result.data.activity);
			alert(result.data.activity);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	return (
		<main className={Styles.app}>
			<h1 className={Styles.logo}>DELAZE</h1>
			<h1>DE - LASE</h1>
			<div className={Styles.intro}>
				<p>Feeling Bored?</p>
				<p>Rejoice! We've a task for you!</p>
			</div>
			<>
				<div className={Styles.intructions}>
					<p>Just help us filter out some data.</p>
				</div>
				<div className={Styles.select_options}>
					<select
						onChange={(e) => {
							setType(e.target.value);
						}}
					>
						<option value="education">Education</option>
						<option value="recreational">Recreational</option>
						<option value="social">Social</option>
						<option value="dity">Dity</option>
						<option value="charity">Charity</option>
						<option value="cooking">Cooking</option>
						<option value="relaxation">Relaxation</option>
						<option value="music">Music</option>
						<option value="busywork">Busywork</option>
					</select>
					<input
						type="number"
						max={10}
						placeholder="Accessibility (0-10)"
						name=""
						id=""
						value={accessibility}
						onChange={(e) => {
							if (Number(e.target.value) <= 10 && Number(e.target.value) >= 0) {
								setAccessibility(e.target.value);
							}
						}}
					/>
					<input
						type="number"
						max={10}
						placeholder="No of people..."
						name=""
						id=""
						value={people}
						onChange={(e) => {
							if (Number(e.target.value) >= 0) {
								setPeople(e.target.value);
							}
						}}
					/>
				</div>
			</>
			<Button onClick={getTask}>{activity ? "Get Another." : "Go!"}</Button>
			<p style={{margin:"10px 0px"}}>OR</p>
			<Button onClick={getRandom}>Get Random</Button>
		</main>
	);
}

export default App;
