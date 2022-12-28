import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Card, InputGroup, Form, Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("osh");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=14e7edbf168effd7917b9e2ed6e94510`
      )
      .then((e) => {
        console.log(e.data);
        setData(e.data);
      });
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    // if (data.weather[0].main == "Clouds") {
    //   emoji = "fa-cloud";
    // } else if (data.weather[0].main === "Thunderstorm") {
    //   emoji = "fa-bolt";
    // } else if (data.weather[0].main === "Drizzle") {
    //   emoji = "fa-cloud-rain";
    // } else if (data.weather[0].main === "Rain") {
    //   emoji = "fa-tint";
    // } else if (data.weather[0].main === "Snow") {
    //   emoji = "fa-snow-flake";
    // } else {
    //   emoji = "fa-smog";
    // }
  } else {
    return <div>...Loading</div>;
  }

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };
  console.log(search);

  return (
    <div className="">
      <Container>
        <Row className={"mt-5 justify-content-center"}>
          <Col md={6}>
            <Card className="bg-dark text-white text-center">
              <Card.Img
                src={`https://source.unsplash.com/600x800/?${data.weather[0].description}`}
                alt="Card image"
              />

              <Card.ImgOverlay>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="search"
                    placeholder="Search City"
                    aria-label="Search City"
                    aria-describedby="basic-addon2"
                    name="search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={handleSubmit}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </InputGroup>
                <div className="bg-dark py-4 bg-opacity-50">
                  <Card.Title className="fs-1">
                    <span className="me-2">{data.name},</span>
                    <span>{data.sys.country}</span>
                  </Card.Title>
                  <Card.Text className={"lead"}>
                    <span className="me-2">
                      {day[0].toUpperCase() + day.slice(1)},
                    </span>
                    <span>
                      {month[0].toUpperCase() + month.slice(1)}, {date}, {year}
                    </span>
                    <br />
                  </Card.Text>
                  <hr />
                  <Card.Text>
                    <p className="lead fw-bolder mb-0">
                      {data.weather[0].main}
                    </p>

                    <img
                      style={{
                        width: "180px",
                        height: "180px",
                        margin: "-25px 0 -40px",
                      }}
                      src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    />
                  </Card.Text>
                  <h1 className="mb-5 m-0 p-0 fw-bolder">
                    {(data.main.temp - 273.44).toFixed(2)} &deg;C
                  </h1>
                  <p className="lead fw-bolder mb-0">
                    {data.weather[0].description[0].toUpperCase() +
                      data.weather[0].description.slice(1)}
                  </p>
                  <p className="m-0 lead">
                    <span>
                      {(data.main.temp_max - 273.44).toFixed(2)} &deg;C
                    </span>
                    <span className="mx-3">|</span>
                    <span>
                      {(data.main.temp_min - 273.44).toFixed(2)} &deg;C
                    </span>
                  </p>
                </div>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
