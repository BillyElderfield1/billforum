import * as React from "react";
import { useState } from "react";

function Test(){
    const [ testVar ] = useState("null");

    return(
        <React.Fragment>
            <h1>Maxwell Is a kewl kid.</h1>
            {testVar}
        </React.Fragment>
    )
}

export default Test;
