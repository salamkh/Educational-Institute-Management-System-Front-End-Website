import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Session from "./components/Session";
import MessagesInbox from "./components/MessagesInbox";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme} style={{outerHeight:"100vh"}}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <Navbar />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode} />
            <Routes>
              <Route path='/' element={<Feed />} />
              <Route path='/components/Profile/:id' element={<Profile />} />
              <Route path='/components/MessagesInbox/:to' element={<MessagesInbox />} />
              <Route path='/components/Session/:courseId/:studentId' element={<Session />} />
            </Routes>
          </Stack>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
