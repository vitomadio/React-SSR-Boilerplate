import React from "react";
import Helmet from "react-helmet";

const Head = () => (
    <div>
        <h2>This is the contact page</h2>
        <Helmet>
            <title>My Title</title>
            <meta name="description" content="This is a proof of concept for React SSR" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
    </div>
);

export default Head;
