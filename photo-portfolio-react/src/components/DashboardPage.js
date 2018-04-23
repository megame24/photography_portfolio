import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import { getListOfAdmins, verifyAdmin } from "../actions/admins";
import ManageAdmins from "./ManageAdmins";
import ManageContent from "./ManageContent";

class DashboardPage extends React.Component {
  state = {
    loading: true
  }

  componentWillMount = () => {
    if (this.props.alpha) this.props.getListOfAdmins();
  };

  verifyAdmin = username => 
    this.props.verifyAdmin(username).then(() => {
      this.props.getListOfAdmins();
    });
  

  // refactor this!!!
  render = () => {
    const { enabled, verified, alpha, admins } = this.props;
    return (
      <div>
        <h2>Dashboard</h2>
        {!verified && (
          <div>
            <Message warning>
              <Message.Header>Account Not Verified</Message.Header>
              <p>
                Your account needs to be verified for you to gain admin
                previlages. Get a chief admin to verify your account
              </p>
            </Message>
          </div>
        )}
        {!enabled && (
          <div>
            <Message negative>
              <Message.Header>Account Disabled</Message.Header>
              <p>
                Your account has been disabled. If you believe this to be a
                mistake, contact a chief admin
              </p>
            </Message>
          </div>
        )}
        {enabled &&
          verified && (
            <div>
              {alpha && (
                <ManageAdmins admins={admins} verifyAdmin={this.verifyAdmin} loading={this.state.loading} />
              )}
              <ManageContent />
            </div>
          )}
      </div>
    );
  };
}

DashboardPage.propTypes = {
  verified: PropTypes.bool.isRequired,
  alpha: PropTypes.bool.isRequired,
  enabled: PropTypes.bool.isRequired,
  getListOfAdmins: PropTypes.func.isRequired,
  verifyAdmin: PropTypes.func.isRequired
};

function mapStateToProps({ user, admins }) {
  return {
    verified: user.verified,
    alpha: user.alpha,
    enabled: user.enabled,
    admins: admins
  };
}

export default connect(mapStateToProps, { getListOfAdmins, verifyAdmin })(DashboardPage);
