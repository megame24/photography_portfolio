import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import getListOfAdmins from "../actions/admins";

class DashboardPage extends React.Component {
  componentWillMount() {
    this.props.getListOfAdmins();
  }

  render() {
    const { verified } = this.props;
    return (
      <div>
        <h2>Dashboard</h2>
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
            <Grid>
              <Grid.Column mobile={16} computer={6}>
                <h4>Manage admins</h4>
              </Grid.Column>
              <Grid.Column mobile={16} computer={10}>
                <Link to="/admin/manage">
                  <Button primary>Manage Content</Button>
                </Link>
              </Grid.Column>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  verified: PropTypes.bool.isRequired,
  getListOfAdmins: PropTypes.func.isRequired
};

function mapStateToProps({ user }) {
  return {
    verified: user.verified
  };
}

export default connect(mapStateToProps, { getListOfAdmins })(DashboardPage);
