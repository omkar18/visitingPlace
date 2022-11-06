import React, { useState, useEffect } from "react";
import {
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  VisitingPlacesData,
  getFavouritePlacesCount,
} from "../redux/actions/visitingPlacesAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import appIcon from "../app-icon.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import AddPlaceDialog from "./AddPlaceDialog";
import { red } from "@mui/material/colors";

export const getClonedObj = (obj) => JSON.parse(JSON.stringify(obj));

function FavouritePlaces() {
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);

  const reducerData = useSelector(
    (state) => state?.VisitingPlacesReducer?.visitingPlacesData
  );

  const handleChangeIsFavourite = async (data) => {
    const tempVisitingLists = getClonedObj(reducerData);
    await Promise.all(
      reducerData.map((item, ind) => {
        if (item.id === data.id) {
          if (item?.isFavourite) {
            item.isFavourite = false;
          } else {
            item.isFavourite = true;
          }
        }
      })
    );
    setListData(tempVisitingLists);
    const res = await dispatch(getFavouritePlacesCount(reducerData));
    getFavouriteData();
  };

  const getFavouriteData = () => {
    const filterData = reducerData.filter((d) => d?.isFavourite);
    console.log("filterData is....", filterData);
    setListData(filterData);
  };
  useEffect(() => {
    if (reducerData) {
      getFavouriteData();
    }
  }, [reducerData]);
  console.log("reducer data...", reducerData);
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" style={{ color: "#ab47bc" }}>
              Favourite Places
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container
        maxWidth="lg"
        style={{
          marginTop: "2.5rem",
          borderRadius: "10px",
        }}
      >
        <Grid container spacing={3}>
          {listData.length > 0 ? (
            listData.map((data) => (
              <Grid item xs={12} sm={4} mb={3}>
                <Card
                  sx={{
                    maxWidth: 345,
                    padding: "1rem",
                    borderRadius: "20px 20px 0px 20px",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={data?.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {data?.placeName}
                    </Typography>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="caption"
                        gutterBottom
                        component="div"
                        color="text.secondary"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span>
                          <LocationOnIcon
                            style={{
                              fontSize: "14px",
                              top: "0.2rem",
                              position: "relative",
                              color: "#ab47bc",
                            }}
                          />{" "}
                          {data?.country}, {data?.state}
                        </span>
                      </Typography>

                      <>
                        <StarIcon
                          onClick={() => handleChangeIsFavourite(data)}
                          style={{
                            cursor: "pointer",
                            color: `${
                              data?.isFavourite ? "#ab47bc" : "#bdbdbd"
                            }`,
                          }}
                        />
                      </>
                    </Grid>
                    <Typography variant="body2" color="text.secondary">
                      {data?.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <>
              <Grid style={{ display: "block", margin: "auto" }}>
                <img
                  src={appIcon}
                  style={{ height: 250, width: 250, marginLeft: "2rem" }}
                />
                <Typography
                  variant="h6"
                  align="center"
                  style={{ color: "#ab47bc", marginTop: "1rem" }}
                >
                  No Places Available. Click on add Place.
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default FavouritePlaces;
