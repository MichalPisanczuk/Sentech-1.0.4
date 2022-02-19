import React from "react";
import { Link } from "react-router-dom";
import myDataBase from "../database.json";
import "../components/SearchResultsDetails.css";

let choicedMake = "";
let choicedModel = "";
let choicedEngine = "";
let year = "";
let power = "";
let wires = "";
let copperWires = "";
let coils = "";
let repairKit = "";
let bar = "";

function searchResultsDetails(props) {
  myDataBase.map((post) => {
    if (props.carMake == post.Marka && props.carModel == post.Model && props.carEngine == post.Silnik) {
      choicedMake = post.Marka;
      choicedModel = post.Model;
      choicedEngine = post.Silnik;
      year = post.Rocznik + post.__EMPTY + post.__EMPTY_1;
      power = post.KM;
      wires = post.__EMPTY_2;
      copperWires = post.__EMPTY_3;
      coils = post.__EMPTY_4;
      repairKit = post.ZestawNaprawczy;
      bar = post.llistwa;
    }
  });

  return (
    <div className='result-grid'>
      <div className='result-title row'>
        <div className='col'>{props.t("Make")}</div>
        <div className='col'>{props.t("Model")}</div>
        <div className='col'>{props.t("Engine")}</div>
        <div className='col'>{props.t("Year")}</div>
        <div className='col'>{props.t("Power")}</div>
        <div className='col'>{props.t("Wires")}</div>
        <div className='col'>{props.t("Copper_Wires")}</div>
        <div className='col'>{props.t("Coils")}</div>
        <div className='col'>{props.t("Repair_Kit")}</div>
        <div className='col'>{props.t("Bar")}</div>
      </div>
      <div className='result-data row'>
        <div className='col'>{choicedMake}</div>
        <div className='col'>{choicedModel}</div>
        <div className='col'>{choicedEngine}</div>
        <div className='col'>{year}</div>
        <div className='col'>{power}</div>
        <div className='col'>
          <span className={wires ? "result-link" : ""}>
            <Link to={`/details/wires/${wires}/${choicedMake}/${choicedModel}/${choicedEngine}`}>{wires}</Link>
          </span>
        </div>
        <div className='col'>
          <span className={copperWires ? "result-link" : ""}>
            <Link to={`/details/copperwires/${copperWires}/${choicedMake}/${choicedModel}/${choicedEngine}`}>{copperWires}</Link>
          </span>
        </div>
        <div className='col'>
          <span className={coils ? "result-link" : ""}>
            <Link to={`/details/coils/${coils}/${choicedMake}/${choicedModel}/${choicedEngine}`}>{coils}</Link>
          </span>
        </div>
        <div className='col'>
          <span className={repairKit ? "result-link" : ""}>
            <Link to={`/details/repairkit/${repairKit}/${choicedMake}/${choicedModel}/${choicedEngine}`}>{repairKit}</Link>
          </span>
        </div>
        <div className='col'>
          <span className={bar ? "result-link" : ""}>
            <Link to={`/details/bar/${bar}/${choicedMake}/${choicedModel}/${choicedEngine}`}>{bar}</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default searchResultsDetails;
