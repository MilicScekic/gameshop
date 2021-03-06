import { formatDistanceToNow, format } from "date-fns";
import { enGB, sr, srLatn } from "date-fns/locale";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { connect } from "react-redux";
import SkeletonSpinner from "./SkeletonSpinner";

const Latest = ({ products, productCount, loading }) => {
  return (
    <Card style={{ flex: 1 }}>
      <CardHeader
        subtitle={`${productCount} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products?.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product.id}>
            <ListItemAvatar>
              <img
                alt={product.name}
                src={product.media.map((m) => m.media)}
                style={{
                  height: 48,
                  width: 48,
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Created ${formatDistanceToNow(
                new Date(product.created),
                { locale: enGB }
              )} ago`}
            />
            <IconButton edge="end" size="small">
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>

      {loading && <SkeletonSpinner />}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  productCount: state.products.productCount,
  loading: state.visual.loading,
});

export default connect(mapStateToProps)(Latest);
