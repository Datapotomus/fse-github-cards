const App = ({title}) => (
  <div className="header">{title}</div>
);

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);