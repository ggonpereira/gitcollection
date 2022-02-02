import styled from 'styled-components';
import { Link as LinkRouterDom } from 'react-router-dom';

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Link = styled(LinkRouterDom)`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 5px;
  font-size: 1.1em;
  transition: 0.3s transform, 0.3s color;
  border-radius: 3px;
  color: #a8a8b3;

  &:hover {
    color: #666666;
    transform: scale(1.1);
  }
`;
