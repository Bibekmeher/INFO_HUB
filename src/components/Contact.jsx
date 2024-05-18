import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { db } from '../firebase'; // import the Firestore instance
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const useStyles = makeStyles((theme) => ({
  contactContainer: {
    padding: theme.spacing(8, 0),
  },
  contactContent: {
    maxWidth: 800,
    margin: '0 auto',
    padding: theme.spacing(4),
    borderRadius: 20,
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
  contactHeading: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    color: '#333',
  },
  contactInfo: {
    marginBottom: theme.spacing(4),
  },
  contactInfoItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    fontSize: 18,
    color: '#555',
    fontFamily: 'Roboto, sans-serif',
  },
  contactIcon: {
    marginRight: theme.spacing(1),
    fontSize: 24,
  },
  contactLink: {
    textDecoration: 'none',
    color: '#007bff',
    transition: 'color 0.3s ease',
    fontFamily: 'Roboto, sans-serif',
    '&:hover': {
      color: '#0056b3',
    },
  },
  contactForm: {
    marginBottom: theme.spacing(4),
  },
  formInput: {
    width: '100%',
    marginBottom: theme.spacing(2),
    fontFamily: 'Roboto, sans-serif',
  },
  submitButton: {
    background: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: 8,
    fontSize: 12,
    fontFamily: 'Roboto, sans-serif',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      background: '#0056b3',
    },
  },
  mapContainer: {
    marginTop: theme.spacing(4),
  },
  errorMessage: {
    color: '#f44336', // red color
    marginBottom: theme.spacing(2),
    fontFamily: 'Roboto, sans-serif',
  },
}));

function SetViewOnClick({ animateRef }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });
  return null;
}

const Contact = () => {
  const classes = useStyles();
  const position = [19.8856, 83.1572]; // Junagarh, Kalahandi, Odisha, India coordinates
  const animateRef = useRef(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Regex pattern for validating email
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      // Query Firestore to check if email already exists
      const q = query(collection(db, 'contacts'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError('This email is already used. Please use a different email.');
        return;
      }

      // Add a new document to the 'contacts' collection
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        timestamp: new Date(),
      });
      alert('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
      setError('');
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Error sending message. Please try again later.');
    }
  };

  return (
    <div className={classes.contactContainer}>
      <Paper className={classes.contactContent} elevation={3}>
        <Typography variant="h1" className={classes.contactHeading}>
          Contact Us
        </Typography>
        <div className={classes.contactInfo}>
          <div className={classes.contactInfoItem}>
            <EmailIcon className={classes.contactIcon} />
            <Typography>Email: </Typography>
            <a href="mailto: bibekkumarmeher621@gmail.com" className={classes.contactLink}>bibekkumarmeher621@gmail.com</a>
          </div>
          <div className={classes.contactInfoItem}>
            <PhoneIcon className={classes.contactIcon} />
            <Typography>Phone: </Typography>
            <a href="tel: 9692422688" className={classes.contactLink}>9692422688</a>
          </div>
          <div className={classes.contactInfoItem}>
            <LocationOnIcon className={classes.contactIcon} />
            <Typography>Address: </Typography>
            <Typography>123 Street Name, City, Country</Typography>
          </div>
        </div>
        <div className={classes.contactForm}>
          <Typography variant="h4" className={classes.contactFormHeading}>
            Send Us a Message
          </Typography>
          {error && <Typography className={classes.errorMessage} color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="Your Name"
              variant="outlined"
              className={classes.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              id="email"
              name="email"
              label="Your Email"
              variant="outlined"
              className={classes.formInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="message"
              name="message"
              label="Your Message"
              variant="outlined"
              multiline
              rows={5}
              className={classes.formInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              type="submit"
            >
              Send Message
            </Button>
          </form>
        </div>
        <div className={classes.mapContainer}>
          <MapContainer center={position} scrollWheelZoom={false} zoom={12} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Our Office
              </Popup>
            </Marker>
            <SetViewOnClick animateRef={animateRef} />
          </MapContainer>
        </div>
      </Paper>
    </div>
  );
};

export default Contact;
