import { formatDistanceToNow } from "date-fns";
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

export const Latest = ({ products }) => {
  return (
    <Card style={{ flex: 1 }}>
      <CardHeader
        subtitle={`${products?.length} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products?.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product.id}>
            <ListItemAvatar>
              <img
                alt={product.name}
                src={product.image}
                style={{
                  height: 48,
                  width: 48,
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Created ${formatDistanceToNow(product.updatedAt)}`}
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
    </Card>
  );
};
