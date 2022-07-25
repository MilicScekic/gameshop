import { Box, Grid, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return <>
    <Box className="ftr">
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={3}>
            <Box>
              <Link to="/">
                <button id="ftrLogo">GS</button>
              </Link>
            </Box>
            <Box>
              <Typography variant="h6">
                Gameshop
              </Typography>
            </Box>
            <Box>
              <Typography>
                A web shop for all things gaming. Welcome!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box>
                <Typography variant="h6">
                  Categories
                </Typography>
            </Box>
            <Box>
              <Link to="/products">
                <Typography component="span">
                  Products
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/consoles">
                <Typography component="span">
                  Consoles
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/headphones">
                <Typography component="span">
                  Headphones
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/games">
                <Typography component="span">
                  Games
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/lifestyle">
                <Typography component="span">
                  Lifestyle
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box>
              <Typography variant="h6">
                Browse
              </Typography>
            </Box>
            <Box>
              <Link to="/">
                <Typography component="span">
                  Home
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/about">
                <Typography component="span">
                  About
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/contact">
                <Typography component="span">
                  Contact
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/shop">
                <Typography component="span">
                  Shop
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/login">
                <Typography component="span">
                  Sign in
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to="/register">
                <Typography component="span">
                  Register
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box>
              <Typography variant="h6">
                  Contact
              </Typography>
            </Box>
            <Box>
              <Typography>
                  <LocalPhoneTwoToneIcon/> +382 68 089 077
              </Typography>
            </Box>
            <Box>
              <Typography>
                  <EmailTwoToneIcon/> shopgame822@gmail.com
              </Typography>
            </Box>
            <Box>
                <Typography component="span">
                    <LocationOnTwoToneIcon/> 
                    <a href="https://www.google.com/maps/place/Rezidencija+Be%C4%8Di%C4%87/@42.4558619,19.2143717,15z/data=!4m5!3m4!1s0x0:0x71cf01260c4c4eeb!8m2!3d42.4558619!4d19.2143717?hl=en">
                      Rezidencija Bečić, Milana Raičkovića, Podgorica
                    </a>
                </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box style={{display:"flex", justifyContent:"center", paddingTop:"1.5rem"}}>
          <a className='ftrIconLink' href="https://www.twitter.com/"><TwitterIcon></TwitterIcon></a>
          <a className='ftrIconLink' href="https://www.facebook.com/"><FacebookIcon></FacebookIcon></a>
          <a className='ftrIconLink'href="https://www.instagram.com/"><InstagramIcon></InstagramIcon></a>
        </Box>
        <Box>
          <Typography variant="h5" 
          style={{
            color:"#444444", 
            fontSize:"0.6rem", 
            borderTop:"1px solid #444444", 
            textAlign:"center", 
            marginTop: "1rem",
            padding: "0.3rem 0 0.3rem 0"
            }}>
            Copyright © 2022 Gameshop
          </Typography>
        </Box>
      </Container>
    </Box>
  </>;
}

export default Footer;
