'use strict';
var PropTypes = require('prop-types');


class ChatUsersApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNames: this.props.userNames.getUsers(),  //func in const testUsers
      added: 'initial'
    };
    this.handleClickTest = this.handleClickTest.bind(this);//React components using ES6 classes no longer autobind this to non React methods.
    // console.log(Object.keys(this.state));
  }

  handleClickTest(userName) {  //can I use any of props? myKeyIndex?
    // this.state.showState(); //call on testUsers obj?
    console.log('ChatUsersApp handleClickTest ' + userName + ' clicked');
    this.setState({
      added: 'clicked @ ' + new Date()
    });
  }
  render() {
    return (<div>
      {
        this.props.userNames.map(function(uName, index) {
          // console.log(index + '--;--' + uName.name );
          return (<ChatUser key={index} myKeyIndex={this.state.added} userName={uName.name} onUserSelected={this.handleClickTest}/>);
        }, this)
      }
    </div>);
  }
}


class ChatUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usrName: this.props.userName,
      myIndex: this.props.myKeyIndex
    };
    this.handleClick = this.handleClick.bind(this); //React components using ES6 classes no longer autobind this to non React methods.
    // console.log(this.state.usrName + ' +++ ' + this.state.myIndex);
  }
  // propTypes: {
  //   this.state.usrName: PropTypes.string.isRequired,
  //   this.state.myIndex: PropTypes.number.isRequired
  // }
  handleClick() {
    console.log('ChatUser handleClick ' +  this.props.userName + ' clicked');
    this.props.onUserSelected(this.props.userName);
  }
  render() {
    // console.log(this.props.userName + ' rendered');
    return (<div onClick={this.handleClick} className="cu">{this.props.userName} * initial: {this.props.myKeyIndex}</div>);
  }
}
ChatUser.propTypes = {
  userName: PropTypes.string.isRequired,
  // myKeyIndex: PropTypes.number.isRequired
};

/* list of logged in Users
make all a react app? can update state from outside? */

var testUsers = [
  {
    name: 'Erik'
  }, {
    name: 'Urban'
  }, {
    name: 'Greger'
  }, {
    name: 'Torsten'
  }
];
// showState: function () {
//   console.log('showState called');
// }
testUsers.getUsers = function() {
  return this.map(u => ({
    userName: u.name,
    img: "imgSrc-" + u.name
  }));
};

ReactDOM.render(<ChatUsersApp userNames={testUsers}/>, document.getElementById('usr-react-app'));
