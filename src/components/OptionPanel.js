import { useState, useCallback } from "react";
import { useLastLocation } from "react-router-last-location";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";
import { ResponsiveContainer } from "../utils/Responsive";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  select: {
    display: "flex",
    justifyContent: "space-between",
  },
  centered: {
    textAlign: "center",
  },
  submitBtn: {
    marginTop: theme.spacing(4),
    background: "#000 !important",
  },
}));

export const ValueLabelComponent = ({ children, open, value }) => (
  <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
    {children}
  </Tooltip>
);

const OptionPanel = ({
  setPage,
  history,
  clearProducts,
  showSpinner,
  location,
  categories,
}) => {
  const [queryParams, setQueryParams] = useState({
    categories: "",
    order: "asc",
  });

  const prevLocation = useLastLocation();
  let prevURL;
  if (prevLocation)
    prevURL = `${prevLocation.pathname}${prevLocation.search}` || null;

  const submitQueryChange = async () => {
    clearProducts();
    showSpinner();
    let queryArr = [];

    for (let key in queryParams) {
      if (queryParams[key]) queryArr.push(`${key}=${queryParams[key]}`);
    }

    await setPage(1);
    history.replace("/products?" + queryArr.join("&"));
  };

  const classes = useStyles();

  return (
    <section style={{ background: "#fff" }}>
      <ResponsiveContainer>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div className={classes.select}>
            <div className={classes.selectBox}>
              <Typography variant="body1">Category</Typography>
              <Select
                sx={{ width: "20rem" }}
                fullWidth
                displayEmpty
                value={queryParams.categories}
                onChange={(e) =>
                  setQueryParams({ ...queryParams, categories: e.target.value })
                }
              >
                <MenuItem value="" disabled>
                  Select one
                </MenuItem>
                {categories.map((category, key) => {
                  return (
                    <MenuItem key={key} value={category.id}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            <div className={classes.selectBox}>
              <Typography variant="body1">Order by price</Typography>
              <Select
                value={queryParams.order}
                onChange={(e) =>
                  setQueryParams({ ...queryParams, order: e.target.value })
                }
              >
                <MenuItem value="asc">Low to High</MenuItem>
                <MenuItem value="desc">High to Low</MenuItem>
              </Select>
            </div>
          </div>

          <div className={classes.centered}>
            <Button
              sx={{ margin: "2rem" }}
              variant="contained"
              onClick={submitQueryChange}
              className={classes.submitBtn}
            >
              Submit changes
            </Button>
            <Button
              variant="outlined"
              onClick={() => history.replace("/products")}
            >
              Clear filters
            </Button>
          </div>
        </div>
      </ResponsiveContainer>
    </section>
  );
};

const mapStateToProps = (state) => ({
  categories: state.products.categories,
});

export default withRouter(connect(mapStateToProps)(OptionPanel));
