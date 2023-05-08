import React from "react"

import { Text, Card, Divider, Button } from "../../layout/styles"
import { size } from "../../layout/theme"

const CategoriseIntro = ({ sorted, onClick }) => {
	return (
		<Card>
			<Text size={size.xs} bold>
				{`Well, you still have ${sorted.length}  uncategorized transactions`}
			</Text>

			<Text size={size.xxs} bottom={1}>
				You can reconcile all your transactions by categorising few of them and
				then allowing the app to do the rest for you
			</Text>
			<Divider />
			<Text bottom={1}>
				Would you like to manually categorize some of your transactions now?
			</Text>
			<Button onClick={onClick}>Categorize now</Button>
		</Card>
	)
}

export default CategoriseIntro
