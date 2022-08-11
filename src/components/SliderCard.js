import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function SliderCard({ id, name, description, image }) {
  return (
    <Link to={`/products/${id}`}>
      <Card
        sx={{
          position: "relative",
          borderRadius: 0,
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          src={image}
          sx={{
            objectFit: "contain",
          }}
        />

        <CardContent
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
            position: {
              xs: "absolute",
            },
            width: "100%",
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: {
              xs: "white",
              md: "red",
            },
          }}
        >
          <Typography gutterBottom variant="h5" component="div" color="primary">
            {name}
          </Typography>
          <Typography variant="body2" color="white">
            {description}
          </Typography>

          <CardActions sx={{ paddingLeft: 0 }}>
            <Button size="medium" variant="contained">
              Buy Now
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Link>
  );
}
