import React from "react";
import styled from "styled-components";

export const Tooltip = styled.div`
  padding: 5px;
  max-width: 20%;
  position: absolute;
  background-color: rgba(200, 200, 225, 0.9);
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(40, 40, 40, 0.6);
  top: ${props => props.top - 35 + "px"};
  left: ${props => props.left + 20 + "px"};
  visibility: ${props => props.visibility};
`;

export const TooltipTitle = styled.h3`
  margin: 2px;
  font-family: Helvetica, sans-serif;
`;

export const TooltipList = styled.ul`
  margin: 2px;
  list-style: none;
  padding-left: 10px;
  font-family: Arial, sans-serif;
`;
