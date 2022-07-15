import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "../components/Slider";
import SliderCard from "../components/SliderCard";

function Home() {
  const placeholderData = [
    {
      name: "Fall Guys",
      description:
        "Fall Guys is a platform battle royale game developed by Mediatonic. The game involves up to 60 players",
      image: "https://images6.alphacoders.com/125/thumb-1920-1250786.jpg",
    },
    {
      name: "Red Dead Redemption 2",
      description:
        "Red Dead Redemption 2 is a 2018 action-adventure game developed and published by Rockstar Games.",
      image: "https://images8.alphacoders.com/958/thumb-1920-958091.jpg",
    },
    {
      name: "Diablo 3",
      description:
        "Diablo III is a genre-defining action-RPG set in Sanctuary, a world ravaged by the eternal conflict between angels and demons.",
      image:
        "https://c4.wallpaperflare.com/wallpaper/483/546/506/angel-artwork-diablo-tyrael-wallpaper-preview.jpg",
    },
  ];

  const placeholderData2 = [
    {
      name: "Elden Ring",
      description:
        "Unparalleled adventure awaits in ELDEN RING, the next epic fantasy title created by FromSoftware, Inc. and BANDAI NAMCO Entertainment Inc.",
      image: "https://images4.alphacoders.com/115/thumb-1920-1151249.jpg",
      area: "product1",
    },
    {
      name: "Sonic the Hedgehog (2020)",
      description:
        "After discovering a small, blue, fast hedgehog, a small-town police officer must help him defeat an evil genius who wants to do experiments on him.",
      image: "https://images5.alphacoders.com/423/thumb-1920-423747.jpg",
      area: "product2",
    },
  ];

  return (
    <Box
      columnGap={1}
      rowGap={0.4}
      maxWidth="xl"
      sx={{
        margin: "0 auto",

        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(4, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gridTemplateRows: "auto",
        gridTemplateAreas: {
          xs: `"slider slider slider slider"
 `,
          md: `"slider slider product1"
          "slider slider product2"
          `,
        },
      }}
    >
      <Grid item xs={12} md={7} gridArea={"slider"}>
        <Slider games={placeholderData} />
      </Grid>
      {placeholderData2.map((game) => {
        return (
          <Grid
            key={game.name}
            gridArea={game.area}
            item
            xs={6}
            md={5}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <SliderCard
              name={game.name}
              description={game.description}
              image={game.image}
            />
          </Grid>
        );
      })}
    </Box>
  );
}

export default Home;
