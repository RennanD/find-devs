import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 30px;

  display: flex;
  align-items: flex-start;

  @media (max-width: 1000px) {
    & {
      flex-direction: column;
    }
  }
`;
