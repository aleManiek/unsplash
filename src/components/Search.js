import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../assets/search_icon.svg";
import { SET_SEARCH, autocomplete, getPhotos } from "../store/unsplashSlice";

export default function Search({ style }) {
  const searchQuery = useSelector((state) => state.photo.search);
  const dispatch = useDispatch();
  const queries = useSelector((state) => state.photo.autocomplete);
  const history = useHistory();

  const handleInputChange = ({ target: { value } }) => {
    dispatch(SET_SEARCH(value));
    dispatch(autocomplete(value));
  };

  const searchPhotos = async (query) => {
    const success = await dispatch(getPhotos(query));
    if (success) history.push(`/search/${query}`);
  };

  return (
    <Wrapper style={style}>
      <Icon />
      <Input
        placeholder="Search"
        onChange={handleInputChange}
        value={searchQuery}
        onKeyPress={(e) => e.key === "Enter" && searchPhotos(searchQuery)}
        style={style}
      />

      {searchQuery.length > 2 && (
        <Autocomplete style={style}>
          {queries.map((query) => (
            <AutocompleteQuery onClick={() => searchPhotos(query)} key={query}>
              {query}
            </AutocompleteQuery>
          ))}
        </Autocomplete>
      )}

      {searchQuery.length > 2 && queries.length === 0 ? (
        <Autocomplete style={style}>
          <AutocompleteQuery>No hints...</AutocompleteQuery>
        </Autocomplete>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: ${(props) => props.height || "1.6em"};
  display: flex;
  background-color: ${(props) => props.backgroundColor || "white"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  position: relative;
  margin: ${(props) => props.margin || "1em 0"};
  padding: ${(props) => props.padding || "0.2em"};
`;

const Icon = styled(SearchIcon)`
  height: 100%;
  width: 10%;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  margin-right: 20px;
  border: none;
  outline: none;
  background-color: ${(props) => props.backgroundColor || "white"};
`;

const Autocomplete = styled.div`
  top: 110%;
  width: 100%;
  position: absolute;
  background-color: ${(props) => props.backgroundColor || "white"};
  border-radius: 10px;
`;
const AutocompleteQuery = styled.div`
  padding: 0.3em 1em;
  margin: 0.5em 0;
  color: black;
  font-size: 0.55em;
  cursor: pointer;
  &:hover {
    background-color: rgb(224, 224, 224);
  }
`;
