export const SALES_CAT_ID = "a-1234"
export const SALES_TITLE = "Sales"
export const BANK_CHARGES_TITLE = "Bank charges"
export const BANK_CHARGES_CAT_ID = "b-5678"

export const categories = [
	{
		categoryId: SALES_CAT_ID,
		keywords: [
			{ keyword: "Paystack", thirdParty: "" },
			{ keyword: "web:from", thirdParty: "ChuKWU" },
			{ keyword: "Transfer", thirdParty: "Funsho" },
		],
		title: SALES_TITLE,
		type: "credit",
	},
	{
		categoryId: BANK_CHARGES_CAT_ID,
		keywords: [
			{ keyword: "Charge + VAT", thirdParty: "" },
			{ keyword: "STAMP DUTY", thirdParty: "" },
			{ keyword: "VAT", thirdParty: "" },
		],
		title: BANK_CHARGES_TITLE,
		type: "debit",
	},
]

export const salesTransactions = [
	{
		id: "G6wI4oVW0q",
		date: "03/06/2022",
		acctName: "26gyqd9n9tl",
		categoryId: "",
		transDate: "03/06/2022",
		balance: "204,126.02",
		amount: 210000,
		remarks:
			"NIP/UBN/FUNSHO R O MR/MOBILE/UNION Transfer from FUNSHO R O MR - rasaqf@yahoo.co",
		type: "credit",
		reference: "",
	},
	{
		id: "LZOpxfOFS",
		type: "credit",
		date: "15/06/2022",
		remarks:
			"NIP/WBP/PayStack-Paystack/374dc041-f75e-4a4e-96cf-feaab2647a3c/Paystack payo",
		acctName: "26gyqd9n9tl",
		balance: "17258440",
		amount: 1621061,
		reference: "",
		categoryId: "",
		transDate: "15/06/2022",
	},
]

export const bankChargesTransactions = [
	{
		id: "JgvocKaPFAH",
		remarks: "NIP CR/PHOSTER SOLUTION ENTERPRISES/GTB",
		transDate: "06/06/2022",
		categoryId: "UxDfZTHNV5B",
		type: "debit",
		acctName: "26gyqd9n9tl",
		date: "06/06/2022",
		amount: 4000000,
		reference: "",
		balance: 26428549,
	},
	{
		id: "NqPlNRIIiWy",
		amount: 5375,
		type: "debit",
		balance: "303,026.02",
		transDate: "02/06/2022",
		acctName: "26gyqd9n9tl",
		reference: "",
		date: "02/06/2022",
		remarks: "NIP Charge + VAT",
		categoryId: "",
	},
]

export const transaction = [
	{
		id: "JgvocKaPFAH",
		remarks: "NIP CR/PHOSTER SOLUTION ENTERPRISES/GTB",
		transDate: "06/06/2022",
		categoryId: "",
		type: "debit",
		acctName: "26gyqd9n9tl",
		date: "06/06/2022",
		amount: 4000000,
		reference: "",
		balance: 26428549,
	},
]
