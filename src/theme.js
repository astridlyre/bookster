import { useMediaQuery, CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMemo } from "react";

export default function Theme({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#00838f",
            light: "#41b3bf",
            dark: "#005662",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#37474f",
            light: "#62727b",
            dark: "#102027",
            contrastText: "#ffffff",
          },
        },
        typography: {
          fontFamily: [
            "Urbanist",
            "-apple-system",
            "BlinkMacSystemFont",
            "Roboto",
            "Helvetica Neue",
          ],
          button: {
            fontWeight: 700,
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
