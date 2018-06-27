import React ,{ Component } from 'react';
import { Link } from  'react-router-dom';
import { connect } from 'react-redux';
import  Payments  from './Payments';

class Header extends Component {
  renderContent(){
      //console.log(this.props.auth);
      switch (this.props.auth) {
        case null :
        return ;
        case false:
        return <li><a href="/auth/google" >Login With Google</a></li>;
        default :
        return [
          <li key="1"><Payments /></li>,
          <li style= {{ margin: '0px 10px'}} key="3"> Credits:{ this.props.auth.credits}</li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
      }
  }
  render(){
    //console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth? '/surveys' : '/'} className="brand-logo">NAM</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
          {this.renderContent()}

          </ul>
        </div>
      </nav>
    );
  }

}
function mapStateToProps( {auth} ){
  return { auth };
}

export default  connect(mapStateToProps)(Header);
