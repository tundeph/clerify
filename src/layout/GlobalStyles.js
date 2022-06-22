import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: "Beatrice";
  src: local("Beatrice"), url("../assets/fonts/Beatrice.ttf") format("truetype");
  font-weight: 800;
}

@font-face {
  font-family: "Beatrice Bold";
  src: local("Beatrice Bold"), url("../assets/fonts/Beatrice_Bold.ttf") format("truetype");
  font-weight: 800;
}

body{
        font-family: "Beatrice", Poppins, sans-serif;
        background-color: ${({ theme }) => theme.colors.background};
        
    }

    `
