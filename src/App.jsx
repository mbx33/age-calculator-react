import { useState } from 'react';
import './App.css';
import './styles.css';

function App() {
	const [error, setError] = useState(false);
	const [date, setDate] = useState({
		day: '',
		month: '',
		year: '',
	});

	const [total, setTotal] = useState({
		day: '- -',
		month: '- -',
		year: '- -',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDate((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const calculateDate = (e) => {
		e.preventDefault();
		const { day, month, year } = date;

		if (day === '' || month === '' || year === '') {
			setError(true);
			return;
		}

		if (month > 12 || month < 1) {
			setError(true);
			return;
		}

		const today = new Date();
		const birthDate = new Date(`${year}-${month}-${day}`);
		let years = today.getFullYear() - birthDate.getFullYear();
		let months = today.getMonth() - birthDate.getMonth();
		let days = today.getDate() - birthDate.getDate();

		if (months < 0 || (months === 0 && days < 0)) {
			years--;
			if (today.getMonth() < birthDate.getMonth()) {
				months = 12 - birthDate.getMonth() + today.getMonth();
			} else {
				months = today.getMonth() - birthDate.getMonth();
			}

			if (today.getDate() < birthDate.getDate()) {
				days =
					new Date(today.getFullYear(), today.getMonth() - 1, 0).getDate() -
					birthDate.getDate() +
					today.getDate();
			} else {
				days = today.getDate() - birthDate.getDate();
			}
		}

		setTotal({
			year: years,
			month: months,
			day: days,
		});
		setError(false);
	};

	return (
		<main>
			<section className="form-section">
				<form className="form-container">
					<div className="input-group">
						<label htmlFor="day">Day</label>
						<input
							type="text"
							name="day"
							id="day"
							maxLength={2}
							onChange={handleChange}
							placeholder="DD"
						/>
						{error && <p className="error">required</p>}
					</div>
					<div className="input-group">
						<label htmlFor="month">Month</label>
						<input
							type="text"
							name="month"
							id="month"
							maxLength={2}
							onChange={handleChange}
							placeholder="MM"
						/>
						{error && <p className="error">required</p>}
					</div>
					<div className="input-group">
						<label htmlFor="year">Year</label>
						<input
							type="text"
							name="year"
							id="year"
							maxLength={4}
							onChange={handleChange}
							placeholder="YYYY"
						/>
						{error && <p className="error">required</p>}
					</div>
				</form>
				<div className="circle">
					<img
						src="/assets/images/icon-arrow.svg"
						alt="Icon arrow down"
						onClick={calculateDate}
					/>
				</div>
				<div className="line" />

				<div className="result">
					<p>
						<span>{total.year} </span>
						Years
					</p>
					<p>
						<span>{total.month} </span>
						Months
					</p>
					<p>
						<span>{total.day} </span>
						Days
					</p>
				</div>
			</section>
		</main>
	);
}

export default App;
