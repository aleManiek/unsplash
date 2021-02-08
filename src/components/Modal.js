import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SET_CURRENT_PHOTO } from "../store/unsplashSlice";

import { ReactComponent as Like } from "../assets/like.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";
import { ReactComponent as Share } from "../assets/share.svg";
import { ReactComponent as Info } from "../assets/info.svg";

export default function Modal() {
  const dispatch = useDispatch();
  const photo = useSelector((state) => state.photo.current_photo);
  const close = (e) => e.target === e.currentTarget && dispatch(SET_CURRENT_PHOTO(null));

  return (
    <ModalContainer onClick={close}>
      <Container>
        <Section>
          <Author>
            <AuthorImg src={photo.user.profile_image.medium} alt={photo.alt_description} />
            <AuthorInfo>
              <Name>{photo.user.name}</Name>
              <UserUrl>@{photo.user.username}</UserUrl>
            </AuthorInfo>
          </Author>
          <ButtonContainer>
            <Button>
              <Like width="1em" height="1em" fill="rgba(0, 0, 0, 0.3)" />
            </Button>
            <Button>
              <Plus width="1em" height="1em" fil="rgba(0, 0, 0, 0.3)" />
            </Button>
          </ButtonContainer>
        </Section>

        <Img src={photo.urls.full} />

        <Section>
          <Location>{photo.location.title}</Location>
          <ButtonContainer>
            <Button>
              <Share width="1em" height="1em" fill="rgba(0, 0, 0, 0.3)" /> Share
            </Button>
            <Button>
              <Info width="1em" height="1em" fill="rgba(0, 0, 0, 0.3)" /> Info
            </Button>
          </ButtonContainer>
        </Section>
      </Container>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5em;
  background-color: white;
  max-width: 95%;
  max-height: 96%;
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  @media (min-width: 720px) {
    max-height: 800px;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.5em;
`;
const Author = styled.div`
  display: flex;
  padding: 0.1em;
`;

const AuthorImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Name = styled.div``;
const UserUrl = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Location = styled.div`
  padding: 0.4em;
`;

const Button = styled.button`
  padding: 0.5em;
  margin: 0.3em;
  color: rgba(0, 0, 0, 0.3);
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;
