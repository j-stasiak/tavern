import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid white;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 20px;
      border-bottom: 1px solid white;
      border-right: 1px solid white;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
export default Styles;