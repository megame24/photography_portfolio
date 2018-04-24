import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "semantic-ui-react";

class ManageAdmins extends React.Component {
  state = {
    loading: false,
    verifying: false,
    enablingOrDisabling: false,
    deleting: false,
    username: ""
  };

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  verifyAdmin = username => {
    this.setState({ loading: true, verifying: true, username });
    this.props.verifyAdmin(username);
  };

  enableOrDisableAdmin = (username, enableOrDisable) => {
    this.setState({ loading: true, enablingOrDisabling: true, username });
    this.props.enableOrDisableAdmin(username, enableOrDisable);
  };

  tableRows = () => {
    return this.props.admins.map(admin => {
      const {
        loading,
        verifying,
        username,
        deleting,
        enablingOrDisabling
      } = this.state;
      return (
        <Table.Row key={admin.username}>
          <Table.Cell>{admin.username}</Table.Cell>
          <Table.Cell>
            {admin.verified ? (
              "verified"
            ) : (
              <Button
                size="small"
                onClick={() => this.verifyAdmin(admin.username)}
                primary
                disabled={admin.alpha || this.state.loading}
              >
                {loading && verifying && username === admin.username
                  ? "verifying..."
                  : "verify"}
              </Button>
            )}
          </Table.Cell>
          <Table.Cell>
            {admin.enabled ? (
              <Button
                size="small"
                onClick={() => this.enableOrDisableAdmin(admin.username, false)}
                color="orange"
                disabled={admin.alpha || this.state.loading}
              >
                {loading && enablingOrDisabling && username === admin.username
                  ? "disabling..."
                  : "disable"}
              </Button>
            ) : (
              <Button
                size="small"
                onClick={() => this.enableOrDisableAdmin(admin.username, true)}
                positive
                disabled={admin.alpha || this.state.loading}
              >
                {loading && enablingOrDisabling && username === admin.username
                  ? "enabling..."
                  : "enable"}
              </Button>
            )}
          </Table.Cell>
          <Table.Cell>
            <Button
              size="small"
              negative
              disabled={admin.alpha || this.state.loading}
            >
              delete
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  render() {
    return (
      <div>
        <h4>Manage Accounts</h4>
        <hr />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Verify</Table.HeaderCell>
              <Table.HeaderCell>Enable / Disable</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.tableRows()}</Table.Body>
        </Table>
      </div>
    );
  }
}

ManageAdmins.propTypes = {
  admins: PropTypes.array.isRequired,
  verifyAdmin: PropTypes.func.isRequired
};

export default ManageAdmins;
