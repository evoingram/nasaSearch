import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

/*
		filterSearchResults by: 
			year (1920 to 2020)
			center (check centers like mediatype)

			<Typography id="range-slider" gutterBottom>
				Temperature range
			</Typography>
			<Slider
				value={value}
				onChange={handleChange}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getAriaValueText={valuetext}
			/>

	*/

const useStyles = makeStyles({
	root: {
		width: 300
	}
});

function valuetext(value) {
	return `${value}`;
}

export default function RangeSlider(props) {
	const classes = useStyles();
	const [yearRangeF, setYearRange] = React.useState([1920, 2020]);

	useEffect(yearRangeF => {
		console.log('yearRange useEffect filterSearchResults = ' + props.yearRange);
		if (yearRangeF !== props.yearRange) {
			props.setYearRangeS(yearRangeF);
		}
	});

	const handleChange = (event, newValue) => {
		console.log('yearRange filterSearchResults newValue = ' + newValue);
		setYearRange(newValue);
		props.setYearRangeS(yearRangeF);
		console.log('yearRangeF filterSearchResults = ' + yearRangeF);
		// this.setState({ yearRange: newValue });
	};

	return (
		<div className={classes.root}>
			<Typography id="range-slider" gutterBottom>
				Select a year from 1920 to 2020
			</Typography>
			<Slider
				min={1920}
				max={2020}
				value={yearRangeF}
				onChange={handleChange}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getAriaValueText={valuetext}
			/>
		</div>
	);
}
