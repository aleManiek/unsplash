import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Search from "../components/Search";
import { getRandomPhoto } from "../store/unsplashSlice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRandomPhoto());
  }, [dispatch]);

  const src = useSelector((state) => state.photo.random_photo);
  return (
    <Container src={src}>
      <Wrapper>
        <Hero>Unsplash</Hero>
        <H1>The internet’s source of freely-usable images. </H1>
        <P>Powered by creators everywhere.</P>
        <Search />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 70%;
`;

const Hero = styled.span`
  display: inline-block;
  margin: 0.25em 0;
  font-size: 2em;
  font-weight: bold;
`;

const H1 = styled.h1`
  font-size: 1em;
  font-weight: normal;
`;

const P = styled.p`
  font-size: 1em;
`;
