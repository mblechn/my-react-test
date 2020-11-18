import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class DocsTable extends Component {
  columns = [
    { path: "filename", label: "File", content: doc => <Link to={`/docs/${doc.id}`}>{doc.filename}</Link> },
    { path: "highlights", label: "Highlights" },
    { path: "score", label: "Score" }
  ];

  // deleteColumn = {
  //   key: "delete",
  //   content: movie => (
  //     <button
  //       onClick={() => this.props.onDelete(movie)}
  //       className="btn btn-danger btn-sm"
  //     >
  //       Delete
  //     </button>
  //   )
  // };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { docs, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={docs}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default DocsTable;
