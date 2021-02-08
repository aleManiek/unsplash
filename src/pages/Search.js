import React, { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Search from "../components/Search";
import Modal from "../components/Modal";
import { getPhoto, getPhotos, CLEAR_AUTOCOMPLETE } from "../store/unsplashSlice";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { query } = useParams();
  const photos = useSelector((state) => state.photo.photos);
  const modalPhoto = useSelector((state) => state.photo.current_photo);

  useEffect(() => {
    dispatch(CLEAR_AUTOCOMPLETE());
    if (photos.length === 0) {
      dispatch(getPhotos(query));
    }
  }, [dispatch, photos.length, query]);

  return (
    <Container>
      <Search style={{ backgroundColor: " rgb(240, 240, 240)" }} />
      <H1>{query}</H1>
      <ResponsiveMasonry columnsCountBreakPoints={{ 240: 1, 480: 2, 900: 3 }}>
        <Masonry>
          {photos.map((photo) => (
            <Photo key={photo.id}>
              <Img src={photo.urls.small} alt={photo.alt_description} onClick={() => dispatch(getPhoto(photo.id))} />
              <TagContainer>
                {photo.tags.map((tag) => (
                  <PhotoTag key={tag.title}>{tag.title}</PhotoTag>
                ))}
              </TagContainer>
            </Photo>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {modalPhoto && <Modal />}
    </Container>
  );
}

const Container = styled.div``;

const H1 = styled.h1`
  padding: 10px;
  text-transform: capitalize;
`;

const Photo = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const Img = styled.img`
  cursor: pointer;
`;

const TagContainer = styled.div`
  padding: 0.2em 0;
  display: flex;
`;

const PhotoTag = styled.div`
  padding: 0.1em 0.2em;
  margin: 0.1em 0.2em 0 0;
  background-color: rgb(240, 240, 240);
  color: rgb(120, 120, 120);
  font-size: 0.7em;
`;
