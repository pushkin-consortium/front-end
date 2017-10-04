import React from 'react';
import DashboardNav from '../../components/DashboardNav/index';
import s from './styles.css';
import DashboardProfile from '../../components/DashboardProfile/index';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: null, section: null };
  }
  login = () => {
    this.props.auth.login();
  };
  logout = () => {
    this.props.auth.logout();
  };
  resetPassword = email => {
    this.props.auth.resetPassword(email);
  };
  updateUser = (payload, userId) => {
    this.props.auth.updateUser(payload, userId);
  };
  //this might not be nessary
  componentWillMount() {
    this.showProfile();
  }
  showProfile = () => {
    if (this.props.auth.isAuthenticated()) {
      this.props.auth.getProfile().then(profile => {
        this.setState({ profile });
      });
    }
  };
  updateLocalProfile = (nickname, imagePreviewUrl) => {
    let profile = { ...this.state.profile, nickname, imagePreviewUrl };
    this.setState({ profile: profile });
  };
  setSection = section => {
    this.setState({ section });
  };
  showContent = () => {
    switch (this.state.section) {
      case 'profile':
        return (
          <DashboardProfile
            profile={this.state.profile}
            logout={this.logout}
            resetPassword={this.resetPassword}
            updateUser={this.updateUser}
            showProfile={this.showProfile}
            updateLocalProfile={this.updateLocalProfile}
          />
        );
      case 'subscriptions':
        return <div>Subscriptions Coming soon ... </div>;
      case 'forum':
        return <div>Forum Coming soon ... </div>;
      default:
        return (
          <DashboardProfile
            profile={this.state.profile}
            logout={this.logout}
            resetPassword={this.resetPassword}
            updateUser={this.updateUser}
            showProfile={this.showProfile}
            updateLocalProfile={this.updateLocalProfile}
          />
        );
    }
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    const loggedIn = isAuthenticated();
    return (
      <div className="styles_blurb_3jf">
        {loggedIn &&
        this.state.profile && (
          <div className={s['dashboard-nav']}>
            <div className={s.section}>
              <DashboardNav setSection={this.setSection} logOut={this.logout} />
            </div>
            <div className={s.content}>{this.showContent()}</div>
          </div>
        )}
        {!loggedIn && (
          <h4 style={{ textAlign: 'center' }}>
            Please{' '}
            <a style={{ cursor: 'pointer' }} onClick={this.login}>
              Log In{' '}
            </a>
            to view your dashboard.
          </h4>
        )}
      </div>
    );
  }
}

export default Dashboard;
