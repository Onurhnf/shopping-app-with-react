import styled from "styled-components";

//--- Styled Component

const Container = styled.div`
max-width: 800px;
margin: 0 auto;
overflow: hidden;

& h2 {
text-align: center;
}
@media (min-width: 1200px) {
.container 
  width: 100%;
  max-width: 1200px;
}

`;
export default Container;
