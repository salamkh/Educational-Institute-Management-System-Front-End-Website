import { Login, Logout, Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  styled,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
  Modal,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";
import { Tooltip, Input, Snackbar, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Lock, VerifiedUser } from "@material-ui/icons";
import axios from "axios";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const Navbar = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [msg, setMsg] = useState('');
  const [phone, setPhone] = useState(" ");
  const [password, setPassword] = useState(" ");

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('password', password);
    axios.post('http://127.0.0.1:8000/api/logInStudent', formData)
      .then(res => {
        let obj = { accessToken: res.data.user.accessToken };

        localStorage.setItem("user", JSON.stringify(obj));

        let id = { id: res.data.user.studentId };

        localStorage.setItem("id", JSON.stringify(id));

        localStorage.setItem("sign", "yes");
        setMsg(res.data.message);
        setOpen(false);
        setOpenAlert(true);
      })
  }

  const handleClose = () => {
    navigate(0);
    setOpenAlert(false);
  }

  const handleClick = () => {
    const local_user = localStorage.getItem("id");
    const id = JSON.parse(local_user);
    console.log("id", id.id);
    navigate('/components/Profile/' + id.id);
  }
  return (
    <>
      <AppBar position="sticky" style={{ direction: "rtl" }}>
        <StyledToolbar>
          <Typography variant="h6" sx={{ display: { xs: "block", sm: "block" } }}>
            معهد التفوق والنجاح
          </Typography>
          {/* <Search>
            <InputBase placeholder="بحث..." />
          </Search> */}
          <Icons sx={{ display: { xs: "flex", sm: "flex" } }}>
            <Tooltip title="تسجيل الدخول">
              <Login onClick={(e) => setOpen(true)} />
            </Tooltip>
            <Tooltip title="تسجيل الخروج">
              <Logout />
            </Tooltip>
            <Tooltip title="حسابي "
              onClick={(e) => handleClick()}
            >
              <Avatar
                sx={{ width: { xs: "10", sm: "30" } , height: { xs: "10", sm: "30" }  }}
                src="/img/Male.png"
              />

            </Tooltip>
          </Icons>

        </StyledToolbar>

        <SytledModal
          open={open}
          onClose={(e) => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ direction: "rtl" }}
        >
          <Box
            width={400}
            height={280}
            bgcolor={"background.default"}
            color={"text.primary"}
            p={3}
            borderRadius={5}
            textAlign="center"
          >
            <Typography variant="h6" color="gray" textAlign="center">
              تسجيل الدخول
            </Typography>
            <br />
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="/img/Profile.png"
            />
            <br />
            <Grid container >
              <Grid item xs={1} md={1} lg={1}>
                <VerifiedUser />
              </Grid>
              <Grid item xs={10} md={10} lg={10}>
                <Input
                  fullWidth
                  type="text"
                  sx={{ width: "100%" }}
                  placeholder="رقم الهاتف"
                  variant="standard"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container >
              <Grid item xs={1} md={1} lg={1}>
                <Lock />
              </Grid>
              <Grid item xs={10} md={10} lg={10}>
                <Input
                  fullWidth
                  type="password"
                  sx={{ width: "100%" }}
                  placeholder="كلمة السر"
                  variant="standard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <ButtonGroup
              style={{ marginTop: "2%", width: "50%" }}
              fullWidth
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={submit}>تسجيل</Button>
            </ButtonGroup>
          </Box>
        </SytledModal>
      </AppBar >
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" style={{ width: '250px' }}  >
          {msg}
        </Alert>
      </Snackbar>
    </>

  );
};

export default Navbar;
