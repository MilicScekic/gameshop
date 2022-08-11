import emailjs from "emailjs-com";
import { TextField, Button, Container, Card, CardContent } from "@mui/material";

function Contact() {
  const sendMail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hhovxml",
        "template_ae3j08i",
        e.target,
        "xTOh0hCVevSyLNbPB"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="contact">
        <Card style={{ flexGrow: "1" }}>
          <CardContent>
            <h2>Contact us</h2>

            <form onSubmit={sendMail}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Name"
                name="name"
              />
              <br />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
              />
              <br />
              <TextField
                variant="outlined"
                margin="normal"
                multiline
                fullWidth
                label="Message"
                name="message"
                rows={4}
              />
              <br />
              <Button type="submit" variant="contained" color="success">
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11774.712924683969!2d19.2143717!3d42.4558619!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x71cf01260c4c4eeb!2zUmV6aWRlbmNpamEgQmXEjWnEhw!5e0!3m2!1sen!2s!4v1660176823016!5m2!1sen!2s"
          className="mapFrame"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}

export default Contact;
