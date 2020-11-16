import React, { Component } from 'react';
import * as documentService from "../services/documentService";

//import { Link } from "react-router-dom";
//import { toast } from "react-toastify";
import DocsTable from "./docsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Docs extends Component {
  state = {
    docs: [],
    docTypes: [
      { _id: "1", name: "All" },
      { _id: "2", name: "Syllabus" },
      { _id: "3", name: "ReALM" },
      { _id: "4", name: "RAT" }
    ],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedDocType: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: docs } = await documentService.getDocs("acd");
    console.log(docs);
    this.setState({ docs });
  }

  handleDocTypeSelect = docType => {
    //this.setState({ selectedDocType: docType, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedDocType: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedDocType,
      searchQuery,
      docs: allDocs
    } = this.state;

    let filtered = allDocs;
    // if (searchQuery)
    //   filtered = allMovies.filter(m =>
    //     m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    //   );
    // else if (selectedDocType && selectedDocType._id)
    //   filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    //const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const sorted = filtered;

    const docs = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: docs };
  };

  render() { 
    const { length: count } = this.state.docs;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>No documents match your search criteria..</p>;

    const { totalCount, data: docs } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.docTypes}
            selectedItem={this.state.selectedDocType}
            onItemSelect={this.handleDocTypeSelect}
          />
        </div>
        
        <div className="col">
          <p>Showing {totalCount} documents from your query.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <DocsTable
            docs={docs}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>

      </div>
    );
  }
};
 
export default Docs;

//filename, id, score