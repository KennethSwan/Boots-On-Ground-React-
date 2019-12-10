import React, { Component } from 'react'; 
import { Button, Grid, Header } from 'semantic-ui-react';
import '../App.css';
import CategoryList from '../CategoryList'

class CategoryContainer extends Component {
	constructor(props){
		super(props)

		this.state ={
			categories: [] 
		};
	}

	componentDidMount(){
		this.getCategories();
	}

	getCategories = async () => {
		try {
			const categories = await fetch(process.env.REACT_APP_API_URL + '/resource/category/');
			const parsedCategories = await categories.json();
			this.setState({
				categories: parsedCategories.data
			})
		} catch(err) {
			console.log(err);
		}
	}

	render(props){
		return(
			<Grid
				columns={2}
				divided
				textAlign='center'
				style={{height: '100%'}}
				verticalAlign='top'
				stackable
			>
				<Grid.Row>
					<Grid.Column>
						<CategoryList
							categories={this.state.category} chooseCategory={this.props.chooseCategory}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			)
		}
	}

export default CategoryContainer;