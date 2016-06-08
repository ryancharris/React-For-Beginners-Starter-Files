const React = require('react');
const ReactDOM = require('react-dom');

// React Router requirements
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
const History = ReactRouter.History;
const createBrowserHistory = require('history/lib/createBrowserHistory');

// Helper functions
const h = require('./helpers');

/*
	App
*/
var App = React.createClass({
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
})

/*
	Header
*/
var Header = React.createClass({
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
})

/*
	Orders
*/
var Order = React.createClass({
	render() {
		return (
			<p>Orders</p>
		)
	}
})

/* 
	Inventory
*/
var Inventory = React.createClass({
	render() {
		return (
			<p>Inventory</p>
		)
	}
})

/*
	StorePicker
*/
var StorePicker = React.createClass({
	mixins: [History],

  goToStore : function(event) {
    event.preventDefault();

    // get the data from the input
    var storeId = this.refs.storeId.value;
    // use it to change the URL w/o reloading page
 	 this.history.pushState(null, '/store/' + storeId);
  },

  render : function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="Submit" />
      </form>
    )
  }

});

/*
	Not Found
*/
var NotFound = React.createClass({
	render : function() {
		return (
			<h1>Not Found</h1>
		)
	}
})

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