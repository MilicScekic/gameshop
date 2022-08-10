// import { formatDistanceToNow } from "date-fns";
// import { enGB } from "date-fns/locale";
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
import { connect } from "react-redux";
import SkeletonSpinner from "../SkeletonSpinner";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const LatestProducts = ({ products, orders, productCount, loading }) => {
  return (
    <Card style={{ flex: 1 }}>
      <CardHeader
        subtitle={`${productCount} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products?.slice(0, 5).map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product.id}>
            {product.media.length > 0 ? (
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
            ) : (
              <ListItemAvatar>
                <img alt={"No image"} src={""} height="48" width="48" />
              </ListItemAvatar>
            )}

            <ListItemText
              primary={product.name}
              secondary={`Created ${moment(product.created).fromNow()}`}
            />
            {/* <IconButton edge="end" size="small">
              <MoreVertIcon />
            </IconButton> */}
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
        <Link to="/admin/products" style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </Box>

      {loading && <SkeletonSpinner />}
    </Card>
  );
};
const LatestOrders = ({ latestOrderedItems, loading }) => {
  return (
    <Card style={{ flex: 1 }}>
      <CardHeader
        subtitle={`${latestOrderedItems?.length} in total`}
        title="Latest orders"
      />
      <Divider />
      <List>
        {latestOrderedItems?.slice(0, 5).map((order, i) => (
          <ListItem
            divider={i < latestOrderedItems.length - 1}
            key={order.product.id}
          >
            {order.product.media.length > 0 ? (
              <ListItemAvatar>
                <img
                  alt={order.product.name}
                  src={
                    order.product.media.length > 0 &&
                    order.product.media[0].media
                  }
                  style={{
                    height: 48,
                    width: 48,
                  }}
                />
              </ListItemAvatar>
            ) : (
              <ListItemAvatar>
                <img alt={"No image"} src={""} height="48" width="48" />
              </ListItemAvatar>
            )}

            <ListItemText
              primary={order.product.name}
              secondary={`Created ${moment(order.product.created).fromNow()}`}
            />
            {/* <IconButton edge="end" size="small">
              <MoreVertIcon />
            </IconButton> */}
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
        <Link to="/admin/orders" style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </Box>

      {loading && <SkeletonSpinner />}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
  latestOrderedItems: state.user.all_orders.map((item) => item.order_items),
  productCount: state.products.productCount,
  loading: state.visual.loading,
});

export default connect(mapStateToProps)(LatestProducts, LatestOrders);
