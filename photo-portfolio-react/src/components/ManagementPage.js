import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ManagementPage = ({ verified, history }) => !verified ? (
    <div>
      {null}
      {history.push("/admin/dashboard")}
    </div>
  ) : (
    <div>
      <h1>Manage content here</h1>
    </div>
  );
;

ManagementPage.propTypes = {
  verified: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ user }) {
  return {
    verified: user.verified
  };
}

export default connect(mapStateToProps)(ManagementPage);
