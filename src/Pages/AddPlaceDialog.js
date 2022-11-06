import React, { useState, useEffect } from "react";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import {
  Button,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Input = styled("input")({
  display: "none",
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddPlaceDialog({
  open,
  handleOpen,
  handleClose,
  payload,
  onChange,
  handleSave,
  onChangeImage,
}) {
  const [accsessToken, setAccessToken] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleChangeCountry = (e, key) => {
    console.log("e?.target?.value", e?.target?.value);
    onChange(key, e?.target?.value);
    if (e?.target?.value) {
      getStatesByCountryId(e?.target?.value);
    }
  };

  const handleChangeState = (e, key) => {
    console.log("e?.target?.value", e?.target?.value);
    onChange(key, e?.target?.value);
    // setSelectedState(e?.target?.value);
  };

  const getAllCountries = async () => {
    const accessToken = await axios.get(
      "https://www.universal-tutorial.com/api/getaccesstoken",
      {
        headers: {
          Accept: "application/json",
          "api-token":
            "sM_xTZTwjLjuo_1jQo1X0x5g4lTli4iWI8KLVTDonUyedxbYoGT1Ga8r4icVEhdp1Nc",
          "user-email": "omkarwalujkar18@gmail.com",
        },
      }
    );
    if (accessToken) {
      setAccessToken(accessToken?.data?.auth_token);
      const res = await axios.get(
        "https://www.universal-tutorial.com/api/countries/",
        {
          headers: {
            Authorization: `Bearer ${accessToken?.data?.auth_token}`,
            Accept: "application/json",
          },
        }
      );
      if (res) {
        setCountries(res?.data);
      }
    }
  };

  const getStatesByCountryId = async (countryId) => {
    const res = await axios.get(
      `https://www.universal-tutorial.com/api/states/${countryId}`,
      {
        headers: {
          Authorization: `Bearer ${accsessToken}`,
          Accept: "application/json",
        },
      }
    );
    if (res) {
      setStates(res?.data);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <Grid
          container
          spacing={3}
          style={{ backgroundColor: "#ab47bc", color: "#FFF" }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "0.3rem",
            }}
          >
            <Typography variant="h6" style={{ marginLeft: "1rem" }}>
              Add New Place
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon style={{ color: "#FFF" }} />
            </IconButton>
          </Grid>
        </Grid>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Place Name"
                variant="filled"
                value={payload?.placeName}
                onChange={(e) => onChange("placeName", e?.target?.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={payload?.country}
                  label="Country"
                  variant="filled"
                  onChange={(e) => handleChangeCountry(e, "country")}
                >
                  <MenuItem value={""}></MenuItem>
                  {countries.length > 0 &&
                    countries.map((data) => (
                      <MenuItem defaultValue="" value={data?.country_name}>
                        {data?.country_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={payload?.state}
                  label="State"
                  variant="filled"
                  onChange={(e) => handleChangeState(e, "state")}
                >
                  <MenuItem value={""}></MenuItem>
                  {states.length > 0 &&
                    states.map((data) => (
                      <MenuItem defaultValue="" value={data?.state_name}>
                        {data?.state_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                id="filled-multiline-flexible"
                label="Description"
                multiline
                rows={2}
                variant="filled"
                fullWidth
                value={payload?.description}
                onChange={(e) => onChange("description", e?.target?.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onChangeImage}
                />
                <Button
                  startIcon={<CloudUploadIcon />}
                  variant="contained"
                  component="span"
                  style={{ textTransform: "none", backgroundColor: "#ab47bc" }}
                >
                  <Typography>Upload Photo</Typography>
                </Button>
              </label>
            </Grid>
            {/* Display selected image */}
            {payload?.image && (
              <Grid item xs={12} sm={6}>
                <img src={payload?.image} height={60} width={60} />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSave}
            startIcon={<SendIcon />}
            style={{ textTransform: "none", backgroundColor: "#ab47bc" }}
            variant="contained"
            size="small"
          >
            <Typography>Save Place</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
