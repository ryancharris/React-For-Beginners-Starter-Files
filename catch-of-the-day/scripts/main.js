var React = require('react');
var ReactDOM = require('react-dom');

// App component
// i.e. <App />
class App extends React.Component {
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header />
				</div>
				<Order />
				<Inventory />
			</div>
		)
	}
}

// Header component
// i.e. <Header />
class Header extends React.Component {
	render() {
		return (
			<p>Header</p>
		)
	}
}

// Orders component
// i.e. <Order />
class Order extends React.Component {
	render() {
		return (
			<p>Orders</p>
		)
	}
}

// Inventory component
// i.e. <Inventory />
class Inventory extends React.Component {
	render() {
		return (
			<p>Inventory</p>
		)
	}
}

// Store picker
// i.e. <StorePicker />
class StorePicker extends React.Component {
	render() {
		var name = 'wes';
		return (
			<form className="store-selector">
				<h2>Please Enter A Store</h2>
				<input type="text" ref="storeId" required />
				<input type="submit" />
			</form>
		)
	}
}

ReactDOM.render(<App  />, document.querySelector('#main'));