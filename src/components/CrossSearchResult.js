import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "../components/SearchResults.css";

const crossApiUrl = "https://api-sentech.herokuapp.com/crosses";

let SENTECH,
  AC_Delco,
  AD,
  BERU,
  BERU_K,
  BOSCH,
  BOSCH_K,
  BOUGICORD,
  BRECAV,
  BREMI,
  CAI,
  CARHOFF_K,
  CAROL,
  CHAMPION,
  DELPHI,
  FACET,
  FAE,
  GEPARD,
  GM,
  HANS_PRISE,
  HART,
  HOLA,
  JAPANPARTS,
  JANMOR,
  KAGER,
  KERR_NELSON,
  KRAFT,
  LEADER,
  LUCAS,
  LYNX,
  MASTER_SPORT,
  MAXGEAR,
  MEDBRYT,
  MM_MSQ,
  MM_MSQ_K,
  MM_MSK,
  MM_MSK_K,
  MOPAR,
  MOTORCRAFT,
  NGK,
  NGK_Stock_no,
  NIPPARTS,
  POWERTEC,
  PROSPARK,
  PROTECHNIC,
  QH,
  TESLA,
  TOPRAN,
  TUTELA,
  OEM = "";

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

  if (props.crossPartId != "") {
    crossesArray.map((item, index) => {
      if (JSON.stringify(item).includes(props.crossPartId)) {
        //return console.log(JSON.stringify(item), index);
        SENTECH = item.SENTECH;
        AC_Delco = item.AC_Delco;
        AD = item.AD;
        BERU = item.BERU;
        BERU_K = item.BERU_K;
        BOSCH = item.BOSCH;
        BOSCH_K = item.BOSCH_K;
        BOUGICORD = item.BOUGICORD;
        BRECAV = item.BRECAV;
        BREMI = item.BREMI;
        CAI = item.CAI;
        CARHOFF_K = item.CARHOFF_K;
        CAROL = item.CAROL;
        CHAMPION = item.CHAMPION;
        DELPHI = item.DELPHI;
        FACET = item.FACET;
        FAE = item.FAE;
        GEPARD = item.GEPARD;
        GM = item.GM;
        HANS_PRISE = item.HANS_PRISE;
        HART = item.HART;
        HOLA = item.HOLA;
        JAPANPARTS = item.JAPANPARTS;
        JANMOR = item.JANMOR;
        KAGER = item.KAGER;
        KERR_NELSON = item.KERR_NELSON;
        KRAFT = item.KRAFT;
        LEADER = item.LEADER;
        LUCAS = item.LUCAS;
        LYNX = item.LYNX;
        MASTER_SPORT = item.MASTER_SPORT;
        MAXGEAR = item.MAXGEAR;
        MEDBRYT = item.MEDBRYT;
        MM_MSQ = item.MM_MSQ;
        MM_MSQ_K = item.MM_MSQ_K;
        MM_MSK = item.MM_MSK;
        MM_MSK_K = item.MM_MSK_K;
        MOPAR = item.MOPAR;
        MOTORCRAFT = item.MOTORCRAFT;
        NGK = item.NGK;
        NGK_Stock_no = item.NGK_Stock_no;
        NIPPARTS = item.NIPPARTS;
        POWERTEC = item.POWERTEC;
        PROSPARK = item.PROSPARK;
        PROTECHNIC = item.PROTECHNIC;
        QH = item.QH;
        TESLA = item.TESLA;
        TOPRAN = item.TOPRAN;
        TUTELA = item.TUTELA;
        OEM = item.OEM;
      }
    });
  }

  return (
    <div>
      <h4>{t("Search results")}</h4>
      <div>
        <span>
          <b> Sentech:</b> {SENTECH ? SENTECH : "No data"}
        </span>
        <span>
          <b> AC Delco:</b> {AC_Delco ? AC_Delco : "No data"}
        </span>
        <span>
          <b> AC:</b> {AD ? AD : "No data"}
        </span>
        <span>
          <b> BERU:</b> {BERU ? BERU : "No data"}
        </span>
        <span>
          <b> BERU (K):</b> {BERU_K ? BERU_K : "No data"}
        </span>
        <span>
          <b> BOSCH:</b> {BOSCH ? BOSCH : "No data"}
        </span>
        <span>
          <b> BOSCH (K):</b> {BOSCH_K ? BOSCH_K : "No data"}
        </span>
        <span>
          <b> BOUGICORD:</b> {BOUGICORD ? BOUGICORD : "No data"}
        </span>
        <span>
          <b> BRECAV:</b> {BRECAV ? BRECAV : "No data"}
        </span>
        <span>
          <b> BREMI:</b> {BREMI ? BREMI : "No data"}
        </span>
        <span>
          <b> CAI:</b> {CAI ? CAI : "No data"}
        </span>
        <span>
          <b> CARHOFF (K):</b> {CARHOFF_K ? CARHOFF_K : "No data"}
        </span>
        <span>
          <b> CAROL:</b> {CAROL ? CAROL : "No data"}
        </span>
        <span>
          <b> CHAMPION:</b> {CHAMPION ? CHAMPION : "No data"}
        </span>
        <span>
          <b> DELPHI:</b> {DELPHI ? DELPHI : "No data"}
        </span>
        <span>
          <b> FACET:</b> {FACET ? FACET : "No data"}
        </span>
        <span>
          <b> FAE:</b> {FAE ? FAE : "No data"}
        </span>
        <span>
          <b> GEPARD:</b> {GEPARD ? GEPARD : "No data"}
        </span>
        <span>
          <b> GM:</b> {GM ? GM : "No data"}
        </span>
        <span>
          <b> HANS PRISE:</b> {HANS_PRISE ? HANS_PRISE : "No data"}
        </span>
        <span>
          <b> HART:</b> {HART ? HART : "No data"}
        </span>
        <span>
          <b> HOLA:</b> {HOLA ? HOLA : "No data"}
        </span>
        <span>
          <b> JAPANPARTS:</b> {JAPANPARTS ? JAPANPARTS : "No data"}
        </span>
        <span>
          <b> JANMOR:</b> {JANMOR ? JANMOR : "No data"}
        </span>
        <span>
          <b> KAGER:</b> {KAGER ? KAGER : "No data"}
        </span>
        <span>
          <b> KERR NELSON:</b> {KERR_NELSON ? KERR_NELSON : "No data"}
        </span>
        <span>
          <b> KRAFT:</b> {KRAFT ? KRAFT : "No data"}
        </span>
        <span>
          <b> LEADER:</b> {LEADER ? LEADER : "No data"}
        </span>
        <span>
          <b> LUCAS:</b> {LUCAS ? LUCAS : "No data"}
        </span>
        <span>
          <b> LYNX:</b> {LYNX ? LYNX : "No data"}
        </span>
        <span>
          <b> MASTER SPORT:</b> {MASTER_SPORT ? MASTER_SPORT : "No data"}
        </span>
        <span>
          <b> MAXGEAR:</b> {MAXGEAR ? MAXGEAR : "No data"}
        </span>
        <span>
          <b> MEDBRYT:</b> {MEDBRYT ? MEDBRYT : "No data"}
        </span>
        <span>
          <b> MM MSQ:</b> {MM_MSQ ? MM_MSQ : "No data"}
        </span>
        <span>
          <b> MM MSQ (K):</b> {MM_MSQ_K ? MM_MSQ_K : "No data"}
        </span>
        <span>
          <b> MM MSK:</b> {MM_MSK ? MM_MSK : "No data"}
        </span>
        <span>
          <b> MM MSK (K):</b> {MM_MSK_K ? MM_MSK_K : "No data"}
        </span>
        <span>
          <b> MOPAR:</b> {MOPAR ? MOPAR : "No data"}
        </span>
        <span>
          <b> MOTORCRAFT:</b> {MOTORCRAFT ? MOTORCRAFT : "No data"}
        </span>
        <span>
          <b> NGK:</b> {NGK ? NGK : "No data"}
        </span>
        <span>
          <b> NGK Stock no:</b> {NGK_Stock_no ? NGK_Stock_no : "No data"}
        </span>
        <span>
          <b> NIPPARTS:</b> {NIPPARTS ? NIPPARTS : "No data"}
        </span>
        <span>
          <b> POWERTEC:</b> {POWERTEC ? POWERTEC : "No data"}
        </span>
        <span>
          <b> PROSPARK:</b> {PROSPARK ? PROSPARK : "No data"}
        </span>
        <span>
          <b> PROTECHNIC:</b> {PROTECHNIC ? PROTECHNIC : "No data"}
        </span>
        <span>
          <b> QH:</b> {QH ? QH : "No data"}
        </span>
        <span>
          <b> TESLA:</b> {TESLA ? TESLA : "No data"}
        </span>
        <span>
          <b> TOPRAN:</b> {TOPRAN ? TOPRAN : "No data"}
        </span>
        <span>
          <b> TUTELA:</b> {TUTELA ? TUTELA : "No data"}
        </span>
        <span>
          <b> OEM:</b> {OEM ? OEM : "No data"}
        </span>
      </div>
    </div>
  );
}
export default CrossSearchResult;
