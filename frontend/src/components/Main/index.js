import styled from "styled-components";

const Main = styled.main`
  flex: 1;

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  margin-left: 30px;

  @media (max-width: 1000px) {
    & {
      margin-left: 0;
      margin-top: 30px;
    }
  }

  @media (max-width: 650px) {
    ul {
      grid-template-columns: 1fr;
    }
  }
`;

export const DevItem = styled.li`
  background: #fff;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  padding: 20px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
    }
  }

  p {
    color: #666;
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0;
  }

  a {
    color: #8b4dff;
    font-size: 14px;
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Info = styled.div`
  margin-left: 10px;

  strong {
    display: block;
    font-size: 16px;
    color: #333;
  }

  span {
    color: #999;
    font-size: 13px;
    margin-top: 4px;
  }
`;

export default Main;
