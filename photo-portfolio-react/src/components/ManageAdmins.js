import React from "react";
import PropTypes from "prop-types";
import { Table, Button } from "semantic-ui-react";

class ManageAdmins extends React.Component {
  state = {
    loading: false,
    username: ""
  };

  verifyAdmin = username => {
    this.setState({ loading: true, username });
    this.props.verifyAdmin(username).then(() => this.setState({ loading: this.props.loading }));
  };

  tableRows = () => {
    return this.props.admins.map(admin => {
      return (
        <Table.Row key={admin.username}>
          <Table.Cell>{admin.username}</Table.Cell>
          <Table.Cell>
            {admin.verified ? (
              "verified"
            ) : (
              <Button
                onClick={() => this.verifyAdmin(admin.username)}
                primary
                disabled={admin.alpha}
              >
                {(this.state.loading && (this.state.username === admin.username))? "verifying..." : "verify"}
              </Button>
            )}
          </Table.Cell>
          <Table.Cell>
            {admin.enabled ? (
              <Button color="orange" disabled={admin.alpha}>
                disable
              </Button>
            ) : (
              <Button positive disabled={admin.alpha}>
                enable
              </Button>
            )}
          </Table.Cell>
          <Table.Cell>
            <Button negative disabled={admin.alpha}>
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
        <h4>Manage Admins</h4>
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
