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
            main: prefersDarkMode ? "#f8bbd0" : "#ad1457",
          },
          secondary: {
            main: prefersDarkMode ? "#eceff1" : "#263238",
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
