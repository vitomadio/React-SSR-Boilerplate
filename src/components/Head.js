import React from "react";
import Helmet from "react-helmet";

const Head = () => (

  <Helmet>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="This is a real time crypto-currencies charts App." />
    <title>Crypto Charts</title>
    <link
      rel="stylesheet"
      href="css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="/css/styles-min.css" />

  </Helmet>

);

export default Head;
