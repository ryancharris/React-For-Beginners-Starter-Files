const React = require('react');
const ReactDOM = require('react-dom');

// React Router requirements
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation= ReactRouter.Navigation;
const createBrowserHistory = require('history/lib/createBrowserHistory');

const h = require('./helpers');

// App component
// i.e. <App />
class App extends React.Component {
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
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
			<header className="top">
				<h1>Catch 
					<span className="ofThe">
						<span className="of">of</span>
						<span className="the">the</span>
					</span>
					Day</h1>
				<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
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
		return (
			<form className="store-selector">
				<h2>Please Enter A Store</h2>
				<input type="text" ref="storeId" defaultValue={h.getFunName()} required />
				<input type="submit" />
			</form>
		)
	}
}

/*
	Not Found
*/
class NotFound extends React.Component {
	render() {
		return (
			<h1>Not Found</h1>
		)
	}
}

/*
	Routes
*/

const routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={StorePicker} />
		<Route path="/store/:storeId" component={App} />
		<Route path="*" component={NotFound} />
	</Router>
)

ReactDOM.render(routes, document.querySelector('#main'));