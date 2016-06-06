var React = require('react');
var ReactDOM = require('react-dom');

// Store picker
// i.e. <StorePicker />
var StorePicker = React.createClass({

	render: function() {
		return (
			<p>Hi</p>
		)
	}
});

ReactDOM.render(<StorePicker />, document.querySelector('#main'));