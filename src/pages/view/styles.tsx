import styled from "@emotion/styled";

export const ViewContainer = styled.div`
  --column-size: 100px;
  --grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  --card-margin-bottom: 15px;
  --scale-size: 1;
`;

export const insideContainerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
};

export const containerStyle = { display: "flex", flexDirection: "column" };

export const titleStyle = { fontSize: "18px" };
