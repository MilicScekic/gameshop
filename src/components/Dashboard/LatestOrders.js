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

const LatestOrders = ({ all_orders, loading }) => {
  return (
    <Card style={{ flex: 1 }}>
      <CardHeader
        subtitle={`${all_orders?.length} in total`}
        title="Latest orders"
      />
      <Divider />
      <List>
        {all_orders?.map((item) =>
          item.order_items.slice(0, 5).map((order, i) => (
            <ListItem divider={i < item.length - 1} key={order.product.id}>
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
          ))
        )}
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
  all_orders: state.user.all_orders,
  productCount: state.products.productCount,
  loading: state.visual.loading,
});

export default connect(mapStateToProps)(LatestOrders);
