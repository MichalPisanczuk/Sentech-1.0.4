import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "../components/SearchResults.css";

const crossApiUrl = "https://api-sentech.herokuapp.com/crosses";

let crossQueryExist = false;

function CrossSearchResult(props) {
  const { t } = useTranslation();
  const [crossLoaded, setCrossLoaded] = useState(false);
  const [crossesArray, setCrossesArray] = useState([]);

  if (props.loading === false && crossLoaded === false) {
    axios
      .get(crossApiUrl)
      .then((response) => {
        setCrossesArray(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) console.log("API not found");
        }
      })
      .finally(() => {
        setCrossLoaded(true);
      });
  }

  if (props.crossPartId !== "") {
    crossQueryExist = true;
  } else {
    crossQueryExist = false;
  }

  return (
    <div>
      <h4>{crossQueryExist ? t("Search results") : ""}</h4>
      {crossQueryExist
        ? crossesArray.map((item, index) => {
            console.log(props.crossPartId);
            if (JSON.stringify(item).includes(props.crossPartId)) {
              return (
                <div key={index}>
                  <span>
                    <b> Sentech:</b>{" "}
                    <Link to={`/details/wires/${item.SENTECH}/${item.Marka}/${item.Typ_model}/${item.Pojemnosc_silnik}`}>
                      {item.SENTECH ? <span className={item.SENTECH ? "result-link" : ""}>{item.SENTECH}</span> : "No data"}
                    </Link>
                  </span>
                  <span>
                    <b> AC Delco:</b> {item.AC_Delco ? item.AC_Delco : "No data"}
                  </span>
                  <span>
                    <b> AC:</b> {item.AD ? item.AD : "No data"}
                  </span>
                  <span>
                    <b> BERU:</b> {item.BERU ? item.BERU : "No data"}
                  </span>
                  <span>
                    <b> BERU (K):</b> {item.BERU_K ? item.BERU_K : "No data"}
                  </span>
                  <span>
                    <b> BOSCH:</b> {item.BOSCH ? item.BOSCH : "No data"}
                  </span>
                  <span>
                    <b> BOSCH (K):</b> {item.BOSCH_K ? item.BOSCH_K : "No data"}
                  </span>
                  <span>
                    <b> BOUGICORD:</b> {item.BOUGICORD ? item.BOUGICORD : "No data"}
                  </span>
                  <span>
                    <b> BRECAV:</b> {item.BRECAV ? item.BRECAV : "No data"}
                  </span>
                  <span>
                    <b> BREMI:</b> {item.BREMI ? item.BREMI : "No data"}
                  </span>
                  <span>
                    <b> CAI:</b> {item.CAI ? item.CAI : "No data"}
                  </span>
                  <span>
                    <b> CARHOFF (K):</b> {item.CARHOFF_K ? item.CARHOFF_K : "No data"}
                  </span>
                  <span>
                    <b> CAROL:</b> {item.CAROL ? item.CAROL : "No data"}
                  </span>
                  <span>
                    <b> CHAMPION:</b> {item.CHAMPION ? item.CHAMPION : "No data"}
                  </span>
                  <span>
                    <b> DELPHI:</b> {item.DELPHI ? item.DELPHI : "No data"}
                  </span>
                  <span>
                    <b> FACET:</b> {item.FACET ? item.FACET : "No data"}
                  </span>
                  <span>
                    <b> FAE:</b> {item.FAE ? item.FAE : "No data"}
                  </span>
                  <span>
                    <b> GEPARD:</b> {item.GEPARD ? item.GEPARD : "No data"}
                  </span>
                  <span>
                    <b> GM:</b> {item.GM ? item.GM : "No data"}
                  </span>
                  <span>
                    <b> HANS PRISE:</b> {item.HANS_PRISE ? item.HANS_PRISE : "No data"}
                  </span>
                  <span>
                    <b> HART:</b> {item.HART ? item.HART : "No data"}
                  </span>
                  <span>
                    <b> HOLA:</b> {item.HOLA ? item.HOLA : "No data"}
                  </span>
                  <span>
                    <b> JAPANPARTS:</b> {item.JAPANPARTS ? item.JAPANPARTS : "No data"}
                  </span>
                  <span>
                    <b> JANMOR:</b> {item.JANMOR ? item.JANMOR : "No data"}
                  </span>
                  <span>
                    <b> KAGER:</b> {item.KAGER ? item.KAGER : "No data"}
                  </span>
                  <span>
                    <b> KERR NELSON:</b> {item.KERR_NELSON ? item.KERR_NELSON : "No data"}
                  </span>
                  <span>
                    <b> KRAFT:</b> {item.KRAFT ? item.KRAFT : "No data"}
                  </span>
                  <span>
                    <b> LEADER:</b> {item.LEADER ? item.LEADER : "No data"}
                  </span>
                  <span>
                    <b> LUCAS:</b> {item.LUCAS ? item.LUCAS : "No data"}
                  </span>
                  <span>
                    <b> LYNX:</b> {item.LYNX ? item.LYNX : "No data"}
                  </span>
                  <span>
                    <b> MASTER SPORT:</b> {item.MASTER_SPORT ? item.MASTER_SPORT : "No data"}
                  </span>
                  <span>
                    <b> MAXGEAR:</b> {item.MAXGEAR ? item.MAXGEAR : "No data"}
                  </span>
                  <span>
                    <b> MEDBRYT:</b> {item.MEDBRYT ? item.MEDBRYT : "No data"}
                  </span>
                  <span>
                    <b> MM MSQ:</b> {item.MM_MSQ ? item.MM_MSQ : "No data"}
                  </span>
                  <span>
                    <b> MM MSQ (K):</b> {item.MM_MSQ_K ? item.MM_MSQ_K : "No data"}
                  </span>
                  <span>
                    <b> MM MSK:</b> {item.MM_MSK ? item.MM_MSK : "No data"}
                  </span>
                  <span>
                    <b> MM MSK (K):</b> {item.MM_MSK_K ? item.MM_MSK_K : "No data"}
                  </span>
                  <span>
                    <b> MOPAR:</b> {item.MOPAR ? item.MOPAR : "No data"}
                  </span>
                  <span>
                    <b> MOTORCRAFT:</b> {item.MOTORCRAFT ? item.MOTORCRAFT : "No data"}
                  </span>
                  <span>
                    <b> NGK:</b> {item.NGK ? item.NGK : "No data"}
                  </span>
                  <span>
                    <b> NGK Stock no:</b> {item.NGK_Stock_no ? item.NGK_Stock_no : "No data"}
                  </span>
                  <span>
                    <b> NIPPARTS:</b> {item.NIPPARTS ? item.NIPPARTS : "No data"}
                  </span>
                  <span>
                    <b> POWERTEC:</b> {item.POWERTEC ? item.POWERTEC : "No data"}
                  </span>
                  <span>
                    <b> PROSPARK:</b> {item.PROSPARK ? item.PROSPARK : "No data"}
                  </span>
                  <span>
                    <b> PROTECHNIC:</b> {item.PROTECHNIC ? item.PROTECHNIC : "No data"}
                  </span>
                  <span>
                    <b> QH:</b> {item.QH ? item.QH : "No data"}
                  </span>
                  <span>
                    <b> TESLA:</b> {item.TESLA ? item.TESLA : "No data"}
                  </span>
                  <span>
                    <b> TOPRAN:</b> {item.TOPRAN ? item.TOPRAN : "No data"}
                  </span>
                  <span>
                    <b> TUTELA:</b> {item.TUTELA ? item.TUTELA : "No data"}
                  </span>
                  <span>
                    <b> OEM:</b> {item.OEM ? item.OEM : "No data"}
                  </span>
                </div>
              );
            }
          })
        : ""}
    </div>
  );
}
export default CrossSearchResult;
