import React from "react";
import styled from "styled-components";
import Search from "../components/Search";

export default function Home() {
  return (
    <Container>
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
  background-image: url(https:images.unsplash.com/photo-1611506420749-9cbb8e5a1057?crop=entropy&cs=srgb&fm=jpg&ixid=MXwyMDQyNjd8MHwxfHJhbmRvbXx8fHx8fHx8&ixlib=rb-1.2.1&q=85);
  background-position: center;
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
