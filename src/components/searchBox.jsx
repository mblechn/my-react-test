import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <React.Fragment>
      <div class="input-group mb-4">
        <input 
          type="text" 
          name="query"
          className="form-control" 
          placeholder="Search ..." 
        />
        <div class="input-group-append">
          <button onClick={e => onChange(value)} class="btn btn-primary" type="button" id="button-addon2">Search</button>
        </div>
      </div>
  </React.Fragment>
  );
};

export default SearchBox;

{/* <InputGroup className="my-3">
    <FormControl
      placeholder="Search ..."
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      value={value}
    />
    <InputGroup.Append>
      <Button variant="primary">Search</Button>
    </InputGroup.Append>
</InputGroup> */}