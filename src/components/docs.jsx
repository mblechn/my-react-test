import React, { Component } from 'react';
import * as documentService from "../services/documentService";

//import { Link } from "react-router-dom";
//import { toast } from "react-toastify";
import DocsTable from "./docsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

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
    searchString: "",
    selectedDocType: null,
    sortColumn: { path: "score", order: "desc" }
  };

  handleDocTypeSelect = docType => {
    //this.setState({ selectedDocType: docType, searchString: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchString: query, selectedDocType: null, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedDocType,
      searchString,
      docs: allDocs
    } = this.state;

    let filtered = allDocs;
    // if (searchString)
    //   filtered = allMovies.filter(m =>
    //     m.title.toLowerCase().startsWith(searchString.toLowerCase())
    //   );
    // else if (selectedDocType && selectedDocType._id)
    //   filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    //const sorted = filtered;

    const docs = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: docs };
  };

  handleSubmit = async(e) => {
    e.preventDefault();
    const { data: docs } = await documentService.getDocs(this.state.searchString);
    this.setState({ docs });
  };

  handleSearchStringChange = e => {
    this.setState({ searchString: e.currentTarget.value });
  }

  handleSort = sortColumn => {
    console.log(sortColumn);
    this.setState({ sortColumn });
  };

  render() { 
    const { length: count } = this.state.docs;
    const { pageSize, currentPage, sortColumn, searchString } = this.state;
    const { user } = this.props;

    //if (count === 0) return <p>No documents match your search criteria.</p>;

    const { totalCount, data: docs } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.docTypes}
            selectedItem={this.state.selectedDocType}
            onItemSelect={this.handleDocTypeSelect}
          />
        </div>
        
        <div className="col">
          <form onSubmit={this.handleSubmit}>
            <InputGroup className="my-3">
              <FormControl value={searchString} onChange={this.handleSearchStringChange} placeholder="Search ..." />
              <InputGroup.Append>
                <Button variant="outline-primary" type="submit">Search</Button>
              </InputGroup.Append>
            </InputGroup>
          </form>

          <p>Showing {totalCount} documents from your query.</p>
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