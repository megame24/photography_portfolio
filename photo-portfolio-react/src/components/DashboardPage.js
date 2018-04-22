import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DashboardPage = ({ verified, username }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome { username }</p>
      {!verified ? (
        <div>
          <Message warning>
            <Message.Header>Account Not Verified</Message.Header>
            <p>
              Your account needs to be verified for you to gain admin
              previlages. Get a verified admin to verify your account
            </p>
          </Message>
        </div>
      ) : (
        <div>
          <Link to="/admin/manage">
            <Button primary>Manage Content</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

DashboardPage.propTypes = {
  verified: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired
};

function mapStateToProps({ user }) {
  return {
    verified: user.verified,
    username: user.username
  };
}

export default connect(mapStateToProps)(DashboardPage);
