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

// Firebase
const Rebase = require('re-base');
const base = Rebase.createClass('https://catch-of-the-day.firebaseio.com/');

/*
	App -- <App />
*/
var App = React.createClass({
	getInitialState : function() {
		return {
			fishes: {},
			order: {}
		}
	},

	componentDidMount : function() {
		base.syncState(this.props.params.storeId + '/fishes', {
			context: this,
			state: 'fishes'
		});

		var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

		if (localStorageRef) {
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	},

	componentWillUpdate : function(nextProps, nextState) {
		localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
	},

	addToOrder : function(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({ order: this.state.order });
	},

	addFish : function(fish) {
		var timestamp = (new Date()).getTime();

		// update state
		this.state.fishes['fish-' + timestamp] = fish;

		// set state
		this.setState({ fishes: this.state.fishes });
	},

	loadSamples : function() {
		this.setState({
			fishes: require('./sample-fishes')
		});
	},

	renderFish: function(key) {
		return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
	},

	render : function() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		)
	}
});

/*
	Fish component -- <Fish />
*/
var Fish = React.createClass({
	onButtonClick: function () {
		this.props.addToOrder(this.props.index);
	},

	render : function() {
		const details = this.props.details;
		const isAvailable = (details.status === 'available' ? true : false);
		const buttonText = (isAvailable ? 'Add to Order' : 'Sold Out!');

		return (
			<li className="menu-fish">
				<img src={details.image} alt={details.name} />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{h.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
			</li>
		)
	}
});

/*
	Add Fish Form -- <AddFishForm />
*/
var AddFishForm = React.createClass({
	createFish : function(event) {
		// 1. stop the form from submitting
		event.preventDefault();

		// 2. take the data from the form and create an object
		var fish = {
			name : this.refs.name.value,
			price : this.refs.price.value,
			status : this.refs.status.value,
			desc : this.refs.desc.value,
			image : this.refs.image.value
		}

		// Add the fish to the App state
		this.props.addFish(fish);

		// Reset form
		this.refs.fishForm.reset();
	},

	render : function() {
		return (
			<form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
				<input type="text" ref="name" placeholder="Fish Name"/>
			   <input type="text" ref="price" placeholder="Fish Price" />
					<select ref="status">
						<option value="available">Fresh!</option>
						<option value="unavailable">Sold Out!</option>
					</select>
				<textarea type="text" ref="desc" placeholder="Desc"></textarea>
				<input type="text" ref="image" placeholder="URL to Image" />
				<button type="submit">+ Add Item </button>
			</form>
		)
	}
});

/*
	Header -- <Header />
*/
var Header = React.createClass({
	render : function() {
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
});

/*
	Order - <Order />
*/
var Order = React.createClass({
	renderOrder : function(key) {
		var fish = this.props.fishes[key];
		var count = this.props.order[key];

		if (!fish) {
			return <li key={key}>Sorry, fish no longer available.</li>
		}

		return (
			<li key={key}>
				{count}lbs.
				{fish.name}
				<span className="price">{h.formatPrice(count * fish.price)}</span>
			</li>
		)

	},

	render : function() {
		var orderIds = Object.keys(this.props.order);
		var total = orderIds.reduce((prevTotal, key) => {
			var fish = this.props.fishes[key];
			var count = this.props.order[key];
			var isAvailable = fish && fish.status === 'available';

			if (fish && isAvailable) {
				return prevTotal + (count * parseInt(fish.price) || 0);
			}

			return prevTotal;
		}, 0);

		return (
			<div className="order-wrap">
				<h2 className="order-title">Your Order</h2>
				<ul classname="order">
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{h.formatPrice(total)}
					</li>
				</ul>
			</div>
		)
	}
});

/* 
	Inventory - <Inventory />
*/
var Inventory = React.createClass({
	render : function() {
		return (
			<div>
				<h2>Inventory</h2>
				<AddFishForm {...this.props} />
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
		)
	}
});

/*
	StorePicker - <StorePicker />
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
});

/*
	Routes
*/

const routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={StorePicker} />
		<Route path="/store/:storeId" component={App} />
		<Route path="*" component={NotFound} />
	</Router>
);

ReactDOM.render(routes, document.querySelector('#main'));