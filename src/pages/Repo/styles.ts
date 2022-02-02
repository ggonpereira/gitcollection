import styled from 'styled-components';

export const RepoInfo = styled.div`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;
    gap: 70px;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      strong {
        font-size: 2.4em;
        color: #3d3d4d;
      }

      p {
        margin-top: 10px;
        font-weight: 600;
        color: #a8a8b3;
      }
    }
  }

  ul {
    display: flex;
    gap: 70px;
    align-items: center;
    margin-top: 80px;
    list-style-type: none;

    li {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 2.4em;
        color: #403f46;
      }

      p {
        font-weight: 600;
        color: #aba8b0;
      }
    }
  }
`;

export const Issues = styled.a`
  display: flex;
  align-items: center;
  margin-top: 16px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 24px 30px;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(6px);
  }

  div {
    display: flex;
    flex-direction: column;
    margin: 0 16px;
    flex: 1;
    width: 100%;

    strong {
      font-size: 1.6em;
      color: #3d3d4d;
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    span {
      margin-top: 20px;
      text-align: right;
      color: #3d3d4d;
      font-weight: 600;
    }
  }

  svg {
    color: #cbcbd6;
  }

  &:first-of-type {
    margin-top: 80px;
  }
`;

export const LoadMore = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  margin-top: 20px;
  background-color: #e6e7e2;
  color: #3d3d4d;
  font-size: 1.5em;
  font-weight: bold;
  border-radius: 7px;
  cursor: pointer;
  border: 2px solid #3d3d4d;
  box-shadow: 0px 4px 15px 1px rgba(61, 61, 77, 0.089);
  transition: all 0.3s;

  &:hover {
    background-color: #3d3d4d;
    color: #e6e7e2;
    box-shadow: 0px 4px 15px 1px rgba(61, 61, 77, 0.24);
  }
`;

export const Animated = styled.object`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
`;
