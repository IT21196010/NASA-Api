import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'animate.css';
import TrackVisibility from 'react-on-screen';



export default function Mars()  {
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=4rrEAFieTzq8smHv0LjiqrWPSD8eLNPq6UBsRQfg`);
        const data = await response.json();
        setRoverPhotos(data.photos);
      } catch (error) {
        console.error('Error fetching Curiosity Rover photos:', error);
      }
    };

    fetchRoverPhotos();
  }, [selectedDate]);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Explore The Mars Rovers</h2>
                  <div className="date-picker">
                    <Form.Group>
                      <Form.Label>Select Date:</Form.Label>
                      <br />
                      <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
                    </Form.Group>
                  </div>
                  <div className="rover-photos">
                    <Row>
                      {roverPhotos.map((photo, index) => (
                        <Col key={index} sm={6} md={4} lg={3}>
                          <Card className="rover-photo">
                            <Card.Img variant="top" src={photo.img_src} style={{ maxWidth: '100%', height: 'auto' }} />
                            <Card.Body>
                              <Card.Title>{photo.camera.full_name}</Card.Title>
                              <Card.Text>{photo.earth_date}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
