var React = require('react');
var ReactDOM = require('react-dom');

// Store picker
// i.e. <StorePicker />
var StorePicker = React.createClass({

	render: function() {
		var name = 'wes';
		return (
			<form className="store-selector">
				<h2>Please Enter A Store</h2>
				<input type="text" ref="storeId" required />
				<input type="submit" />
			</form>
		)
	}
});

ReactDOM.render(<StorePicker />, document.querySelector('#main'));