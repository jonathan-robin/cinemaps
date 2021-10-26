import React, { useEffect } from "react";
import Header from "./components/Header";
import { withRouter } from 'next/router'
// Créer interface serverResponse
function results(this:any) {
    // console.log(this.props.query)
    useEffect(() => {
        console.log(this.props.query)
    },[])
  return (
    <div>
      <Header />
      {/* {props.router.query.result.features.map((feature:any, index:any)=>{
          return (
            <div className="container">
            <div className="card text-white bg-primary mb-3" style={{maxWidth:'20rem'}}>
              <div className="card-header">{feature.properties.city}</div>
              <div className="card-body">
                <h4 className="card-title">{feature.properties.citycode}</h4>
                <p className="card-text">
                {feature.properties.label}
                {feature.properties.type}
                {feature.properties.x}
                {feature.properties.y}
                </p>
              </div>
            </div>
          </div>
          )
      })} */}

    </div>
  );
}

export default withRouter(results);
