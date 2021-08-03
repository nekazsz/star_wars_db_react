import { Component } from 'react'

import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'


const withDetails = (View) => {
	return class extends Component {

		state = {
			item: null,
			image: null,
			loader: true,
			error: false
		};

		componentDidMount() {
			this.updatePerson()
		}

		componentDidUpdate(prevProps) {
			if (this.props.itemId !== prevProps.itemId) {
				this.updatePerson()
				this.setState({ loader: true })
			}
		}

		onError = () => {
			this.setState({
				error: true,
				loader: false
			})
		}

		updatePerson() {
			const { itemId } = this.props
			if (!itemId) {
				return
			}

			this.props.getData(itemId)
				.then((item) => {
					this.setState({
						item,
						loader: false,
						image: this.props.getPersonImage(item)
					})
				})
				.catch(this.onError)
		}

		render() {

			const { loader, error } = this.state

			const hasData = loader || error

			const errorMessage = error && <ErrorIndicator/>
			const spinner = loader && <Spinner/>
			const content = !hasData && <View { ...this.props } data={ this.state }/>

			return (
				<>
					{ errorMessage }
					{ spinner }
					{ content }
				</>
			)
		}

	}
}

export default withDetails