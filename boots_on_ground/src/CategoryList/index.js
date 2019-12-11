import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

export default function CategoryList(props){
	let categories = null
	if (props.categories) {
		categories = props.category.map((category, i) => {

			return(
				<div key={i}>
					<Button onClick={()=>props.chooseCategory(category.category)}>{category.category}</Button>
				</div>
			)
		})

	return(
		<div>
			{ categories }
		</div>
	)
}
}