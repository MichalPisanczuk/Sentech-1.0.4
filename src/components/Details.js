import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import myDataBase from "../database.json";
import myDataBaseAll from "../database.json";
import "../components/Details.css";

let year = "";
let power = "";
let wires = "";
let copperWires = "";
let coils = "";
let repairKit = "";
let bar = "";

let index = 0;
let searchItem = "";

function Details() {
  const { t } = useTranslation();
  let { type, partId, choicedMake, choicedModel, choicedEngine } = useParams();
  let path = "";

  switch (type) {
    case "wires":
      path = "sets";
      break;
    case "copperwires":
      path = "sets";
      break;
    case "coils":
      path = "coils";
      break;
    case "repairkit":
      path = "coils";
      break;
    case "bar":
      path = "sets";
      break;
  }

  myDataBase.map((post) => {
    if (choicedMake == post.Marka && choicedModel == post.Model && choicedEngine == post.Silnik) {
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
    <>
      <div className='content'>
        <div className='result-content'>
          <div className='photo-result-content'>
            {/* <Link to={`/photo/${id}`}> */}
            <img alt={partId} className='photo-img' src={`http://sentech.pl/pictures/${path}1/${partId}.jpg`} />
            {/* </Link> */}
            {/* <Link to={`/photo/${id}`}> */}
            <img alt={partId} className='photo-img' src={`http://sentech.pl/pictures/${path}2/${partId}.jpg`} />
            {/* </Link> */}
            {/* <Link to={`/photo/${id}`}> */}
            <img alt={partId} className='photo-img' src={`http://sentech.pl/pictures/${path}3/${partId}.jpg`} />
            {/* </Link> */}
          </div>
          <div className='car-result-content'>
            <h3>{t("Your_car")}</h3>
            <p>
              {t("Make")}: {choicedMake}
            </p>
            <p>
              {t("Model")}: {choicedModel}
            </p>
            <p>
              {t("Engine")}: {choicedEngine}
            </p>
            <p>
              {t("Year")}: {year}
            </p>
            <p>
              {t("Power")}: {power}
            </p>
            <p>
              {t("Wires")}:
              <span className={wires ? "result-link" : ""}>
                <Link to={`/details/wires/${wires}/${choicedMake}/${choicedModel}/${choicedEngine}`}>{wires}</Link>
              </span>
            </p>
            <p>
              {t("Copper_Wires")}:
              <span className={copperWires ? "result-link" : ""}>
                <Link to={`/details/copperwires/${copperWires}/${choicedMake}/${choicedModel}/${choicedEngine}`}>{copperWires}</Link>
              </span>
            </p>
            <p>
              {t("Coils")}:
              <span className={coils ? "result-link" : ""}>
                <Link to={`/details/coils/${coils}/${choicedMake}/${choicedModel}/${choicedEngine}`}>{coils}</Link>
              </span>
            </p>
            <p>
              {t("Repair_Kit")}:
              <span className={repairKit ? "result-link" : ""}>
                <Link to={`/details/repairkit/${repairKit}/${choicedMake}/${choicedModel}/${choicedEngine}`}>{repairKit}</Link>
              </span>
            </p>
            <p>
              {t("Bar")}:
              <span className={bar ? "result-link" : ""}>
                <Link to={`/details/bar/${bar}/${choicedMake}/${choicedModel}/${choicedEngine}`}>{bar}</Link>
              </span>
            </p>
          </div>
        </div>

        <div className='result-grid'>
          <div className='result-title row'>
            <div className='col'>{t("Make")}</div>
            <div className='col'>{t("Model")}</div>
            <div className='col'>{t("Engine")}</div>
            <div className='col'>{t("Year")}</div>
            <div className='col'>{t("Power")}</div>
            <div className='col'>{t("Wires")}</div>
            <div className='col'>{t("Copper_Wires")}</div>
            <div className='col'>{t("Coils")}</div>
            <div className='col'>{t("Repair_Kit")}</div>
            <div className='col'>{t("Bar")}</div>
          </div>
          {myDataBaseAll.map((item) => {
            if (type == "wires") searchItem = item.__EMPTY_2;
            if (type == "copperwires") searchItem = item.__EMPTY_3;
            if (type == "coils") searchItem = item.__EMPTY_4;
            if (type == "repairkit") searchItem = item.ZestawNaprawczy;
            if (type == "bar") searchItem = item.listwa;
            if (partId == searchItem) {
              index++;
              return (
                <div className={index % 2 === 0 ? "result-data row" : "result-data row even"}>
                  <div className='col'>{item.Marka}</div>
                  <div className='col'>{item.Model}</div>
                  <div className='col'>{item.Silnik}</div>
                  <div className='col'>{item.Rocznik + item.__EMPTY + item.__EMPTY_1}</div>
                  <div className='col'>{item.KM}</div>
                  <div className='col'>
                    <span className={item.__EMPTY_2 ? "result-link" : ""}>
                      <Link to={`/details/wires/${item.__EMPTY_2}/${item.Marka}/${item.Model}/${item.Silnik}`}>{item.__EMPTY_2}</Link>
                    </span>
                  </div>
                  <div className='col'>
                    <span className={item.__EMPTY_3 ? "result-link" : ""}>
                      <Link to={`/details/copperwires/${item.__EMPTY_3}/${item.Marka}/${item.Model}/${item.Silnik}`}>{item.__EMPTY_3}</Link>
                    </span>
                  </div>
                  <div className='col'>
                    <span className={item.__EMPTY_4 ? "result-link" : ""}>
                      <Link to={`/details/coils/${item.__EMPTY_4}/${item.Marka}/${item.Model}/${item.Silnik}`}>{item.__EMPTY_4}</Link>
                    </span>
                  </div>
                  <div className='col'>
                    <span className={item.ZestawNaprawczy ? "result-link" : ""}>
                      <Link to={`/details/repairkit/${item.ZestawNaprawczy}/${item.Marka}/${item.Model}/${item.Silnik}`}>{item.ZestawNaprawczy}</Link>
                    </span>
                  </div>
                  <div className='col'>
                    <span className={item.listwa ? "result-link" : ""}>
                      <Link to={`/details/bar/${item.listwa}/${item.Marka}/${item.Model}/${item.Silnik}`}>{item.listwa}</Link>
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Details;
