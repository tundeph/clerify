import { useState, useEffect } from "react"
import { format, subDays, addDays, differenceInDays } from "date-fns"
import { returnColorOptions } from "../helper/default-data"

const returnDate = (dateValue) => {
	return new Date(dateValue)
}

//
const returnRawCashflowData = (datas, startDate, endDate) => {
	let labelArray = []
	let dailyCategory = {}

	const numberOfDays = differenceInDays(new Date(endDate), new Date(startDate))
	for (let counter = 0; counter <= numberOfDays; counter++) {
		const added = format(addDays(new Date(startDate), counter), "MMM d")
		labelArray.push(added)
	}

	//get date object
	const final = Array.from(Array(numberOfDays).keys(), (x) => 0)

	let inflow = [...final]
	let outflow = [...final]

	if (!datas) {
		const initialData = {
			labels: labelArray,
			datasets: [],
		}
		return initialData
	}

	datas
		.filter((data) => {
			return (
				returnDate(data.date) >= returnDate(startDate) &&
				returnDate(data.date) <= returnDate(endDate) &&
				data.categoryId
			)
		})
		.sort((a, b) => returnDate(a.date) - returnDate(b.date))
		.forEach((item) => {
			let currentKey = differenceInDays(
				new Date(item.date),
				new Date(startDate)
			)

			//dailyCashflow
			if (item.type === "credit") {
				inflow[currentKey] += item.amount
			} else if (item.type === "debit") {
				outflow[currentKey] += item.amount
				console.log("currentKey:", currentKey)
			}

			//dailyCategory
			if (!dailyCategory[item.categoryId]) {
				dailyCategory[item.categoryId] = [...final]
				dailyCategory[[item.categoryId]][currentKey] = item.amount / 100
			} else {
				dailyCategory[[item.categoryId]][currentKey] = item.amount / 100
			}
		})

	return { dailyCategory, dailyCashflow: { inflow, outflow } }
}

//
export const getCategoryChartData = (
	datas,
	categories,
	filteredCategories,
	startDate,
	endDate
) => {
	let labelArray = []
	let dailyCategory = {}

	//calculate number of days between start and end date
	const numberOfDays = differenceInDays(new Date(endDate), new Date(startDate))

	// create the array for the chart labels
	for (let counter = 0; counter <= numberOfDays; counter++) {
		const added = format(addDays(new Date(startDate), counter), "MMM d")
		labelArray.push(added)
	}

	//get date object which uses dates as keys/props and add 0 as value for all dates
	const final = Array.from(Array(labelArray.length).keys(), (x) => 0)

	const resultForCategory = { labels: labelArray, datasets: [] }

	if (!datas) {
		return resultForCategory
	} else {
		// filter data that are within the date and have categoryId
		datas
			.filter((data) => {
				return (
					returnDate(data.date) >= returnDate(startDate) &&
					returnDate(data.date) <= returnDate(endDate) &&
					data.categoryId
				)
			})
			.sort((a, b) => returnDate(a.date) - returnDate(b.date)) //sort them according to date
			.forEach((item) => {
				//dailyCategory
				//currentKey is used to determine what day the iterator is on
				let currentKey = differenceInDays(
					new Date(item.date),
					new Date(startDate)
				)

				//if a categoryId does not exist, set the object for that categoryId
				if (!dailyCategory[item.categoryId]) {
					dailyCategory[item.categoryId] = [...final]
					// add the amount of the transaction inside the categoryId.currentKey
					dailyCategory[item.categoryId][currentKey] += item.amount / 100
				} else {
					// add the amount of the transaction inside the categoryId.currentKey
					dailyCategory[item.categoryId][currentKey] += item.amount / 100
				}
			})

		//format the soreted dailyCategory data for chart.js
		Object.entries(dailyCategory).forEach((currentData) => {
			// check that filteredCategories has a category
			// this is used to make the chart responsive so that we can filter categories to be
			// shown from the user interface. currentData[0] returns categoryId
			if (filteredCategories.includes(currentData[0])) {
				const title = categories.filter(
					(currentCategory) => currentCategory.categoryId === currentData[0]
				)[0].title
				const obj = {
					label: title,
					data: currentData[1],
					borderColor: returnColorOptions(),
					tension: 0.2,
				}
				resultForCategory.datasets.push(obj)
				resultForCategory.labels = labelArray
			}
		})

		return resultForCategory
	}
}

export const getCashflowChartData = (datas, startDate, endDate) => {
	let { dailyCashflow } = returnRawCashflowData(datas, startDate, endDate)
	let resultForDailyCashflow = {}
	console.log("dailyCashflow", dailyCashflow)
	const emptyTransactions = [0, 0]
	const dayLabel = Array.from(Array(30).keys(), (x) => x + 1)

	if (!datas) {
		dailyCashflow = {
			inflow: emptyTransactions,
			outflow: emptyTransactions,
		}
	}

	//format for MOM cashflow
	const inflowMonthly = dailyCashflow.inflow.reduce(
		(previous, current) => previous + current,
		0
	)
	const outflowMonthly = dailyCashflow.outflow.reduce(
		(previous, current) => previous + current,
		0
	)

	const inflowDaily = dailyCashflow.inflow.map((selected) => selected / 100)
	const outflowDaily = dailyCashflow.outflow.map((selected) => selected / 100)

	resultForDailyCashflow = {
		labels: dayLabel,
		datasets: [
			{
				label: "Inflow",
				data: inflowDaily,
				backgroundColor: returnColorOptions(),
			},
			{
				label: "Outflow",
				data: outflowDaily,
				backgroundColor: returnColorOptions(),
			},
		],
	}

	const resultForMonthlyCashflow = {
		labels: ["Inflow", "Outflow"],
		datasets: [
			{
				label: "# of Votes", ////check this label
				data: [inflowMonthly / 100, outflowMonthly / 100],
				backgroundColor: ["#afb42b", "#ffcc80"],
				// borderColor: ["#dcedc8", "#ffcc80"],
				borderWidth: 0.5,
				hoverOffset: 10,
				hoverBackgroundColor: ["#afb42b", "#ffcc80"],
			},
		],
	}

	// return { resultForMonthlyCashflow, resultForDailyCashflow }
	return resultForMonthlyCashflow
}
