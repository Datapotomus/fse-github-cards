
	const testData = [
			{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
      {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  		{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
	];


// CardList
const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
  </div>
)
/**
 * Replaced these examples with the one below via the video. 
 * This allows us to not have to hardcode any of the profiles.
 * <Card {...testData[0]}/>
 * <Card {...testData[1]}/>
 * Turns into this {testData.map(profile => <Card {...profile}/>)}
 */

class Card extends React.Component{
  render(){
    const profile = this.props;
    return (
      <div className="github-profile" >
        <img src={profile.avatar_url} />
        <div className="info" >
          <div className="name" > {profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    )
  }
}




//Building a form to enter user Data
class Form extends React.Component{
  // userNameInput = React.createRef();
  state = { userName: ''}
  handleSubmit = async (event) =>{
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`)
    this.props.onSubmit(resp.data)
    this.setState({ userName: '' })
  };
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text"
          value={this.state.userName} 
          placeholder="Github username" 
          //Doing this allows you to do state after every character.
          onChange={event => this.setState({ userName: event.target.value})}
          required 
        />
        <button> Add card</button>
      </form>
    ); 
  }
}
class App extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     profiles: testData,
  //   };
  // }
  state = {
    //keeping this testData, because it's nice to see something to start with.
    // profiles: [testData],
    profiles: [],
  }
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }))
    console.log('App', profileData)
  }

  render(){
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  }
}

// const App = ({title}) => (
//   <div className="header">{title}</div>
// );

ReactDOM.render(
	<App title="The GitHub Cards App" />,
  mountNode,
);