import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import SearchResults from "./SearchResults";
import "../components/Details.css";

const apiUrl = "https://api-sentech.herokuapp.com/parts";

function Details() {
  const { t } = useTranslation();
  let { type, partId, choicedMake, choicedModel, choicedEngine } = useParams();

  let hideCar = false;

  const [cars, setCar] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [hidePopup, setHidePopup] = useState(true);
  const [photoURL, setPhotoURL] = useState(null);
  const [currentImage, setCurrentImage] = useState();

  let make,
    model,
    engine,
    year,
    power,
    cylinders,
    wires,
    copperWires,
    coils,
    repairKit,
    bar,
    oem,
    photo_wires_1,
    photo_wires_2,
    photo_wires_3,
    photo_copper_1,
    photo_copper_2,
    photo_copper_3,
    photo_coils_1,
    photo_coils_2,
    photo_coils_3,
    photo_RepairKit_1,
    photo_bar_1,
    photo_bar_2,
    photo_bar_3 = "";

  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        setCar(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) console.log("API not found");
          setErrorMsg(`API not found ${error.response.status}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  cars.map((item) => {
    if (item.Rok_od === "undefined") item.Rok_od = "";
    if (item.Rok_do === "undefined") item.Rok_do = "";
    if (
      (partId == item.Przewody || partId == item.Przewody_miedziane || partId == item.Cewka || partId == item.Listwa || partId == item.Zestaw_naprawczy) &&
      choicedMake == item.Marka &&
      choicedModel == item.Typ_model &&
      choicedEngine == item.Pojemnosc_silnik
    ) {
      hideCar = false;
      make = item.Marka;
      model = item.Typ_model;
      engine = item.Pojemnosc_silnik;
      power = item.Moc;
      cylinders = item.Ilosc_cylindrow;
      year = item.Rok_od + "-" + item.Rok_do;
      wires = item.Przewody;
      copperWires = item.Przewody_miedziane;
      coils = item.Cewka;
      repairKit = item.Zestaw_naprawczy;
      bar = item.Listwa;
      oem = item.Oem;
      photo_wires_1 = item.Photo_Przewody_1;
      photo_wires_2 = item.Photo_Przewody_2;
      photo_wires_3 = item.Photo_Przewody_3;
      photo_copper_1 = item.Photo_Przewody_Miedziane_1;
      photo_copper_2 = item.Photo_Przewody_Miedziane_2;
      photo_copper_3 = item.Photo_Przewody_Miedziane_3;
      photo_coils_1 = item.Photo_Cewki_1;
      photo_coils_2 = item.Photo_Cewki_2;
      photo_coils_3 = item.Photo_Cewki_3;
      photo_RepairKit_1 = item.Photo_RepairKit_1;
      photo_bar_1 = item.Photo_Listwa_1;
      photo_bar_2 = item.Photo_Listwa_2;
      photo_bar_3 = item.Photo_Listwa_3;
    } else if (
      partId == item.Przewody ||
      partId == item.Przewody_miedziane ||
      partId == item.Cewka ||
      partId == item.Listwa ||
      partId == item.Zestaw_naprawczy ||
      (choicedMake == item.Marka && choicedModel == item.Typ_model && choicedEngine == item.Pojemnosc_silnik)
    ) {
      hideCar = true;
      photo_wires_1 = item.Photo_Przewody_1;
      photo_wires_2 = item.Photo_Przewody_2;
      photo_wires_3 = item.Photo_Przewody_3;
      photo_copper_1 = item.Photo_Przewody_Miedziane_1;
      photo_copper_2 = item.Photo_Przewody_Miedziane_2;
      photo_copper_3 = item.Photo_Przewody_Miedziane_3;
      photo_coils_1 = item.Photo_Cewki_1;
      photo_coils_2 = item.Photo_Cewki_2;
      photo_coils_3 = item.Photo_Cewki_3;
      photo_RepairKit_1 = item.Photo_RepairKit_1;
      photo_bar_1 = item.Photo_Listwa_1;
      photo_bar_2 = item.Photo_Listwa_2;
      photo_bar_3 = item.Photo_Listwa_3;
    }
  });

  const goToShop = () => {
    window.open(`http://www.stanczyk.pl/product/search?query=${partId}`, "blank");
  };

  const showPopup = () => {
    hidePopup ? setHidePopup(false) : setHidePopup(true);
  };

  const thumbnails = document.querySelectorAll(".photo-img");

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", (e) => {
      setPhotoURL(e.target.src);
      setCurrentImage(index);
    });
  });

  const closePopup = function () {
    const popup = document.querySelector(".popup");
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        setHidePopup(true);
      }
    });
  };

  const nextIMG = () => {
    if (photoURL !== null) {
      if (currentImage === thumbnails.length - 1) {
        setCurrentImage(0);
        setPhotoURL(thumbnails[currentImage].src);
      } else {
        setCurrentImage((currentImage) => currentImage + 1);
        setPhotoURL(thumbnails[currentImage].src);
      }
    }
  };

  const previousIMG = () => {
    if (photoURL !== null) {
      if (currentImage === 0) {
        setCurrentImage((currentImage) => thumbnails.length - 1);
        setPhotoURL(thumbnails[currentImage].src);
      } else {
        setCurrentImage((currentImage) => currentImage - 1);
        setPhotoURL(thumbnails[currentImage].src);
      }
    }
  };

  return (
    <>
      <div className='content'>
        <div className='message'>
          <h1>{loading ? t("loading") : ""}</h1>
          <p>{loading ? t("loading info") : ""}</p>
          <div>{errorMsg}</div>
        </div>
        <div className='result-content'>
          <div className='photo-result-content'>
            <img alt={partId} className={photo_wires_1 && type === "wires" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_wires_1} />
            <img alt={partId} className={photo_wires_2 && type === "wires" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_wires_2} />
            <img alt={partId} className={photo_wires_3 && type === "wires" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_wires_3} />
            <img alt={partId} className={photo_copper_1 && type === "copperwires" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_copper_1} />
            <img alt={partId} className={photo_copper_2 && type === "copperwires" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_copper_2} />
            <img alt={partId} className={photo_copper_3 && type === "copperwires" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_copper_3} />
            <img alt={partId} className={photo_coils_1 && type === "coils" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_coils_1} />
            <img alt={partId} className={photo_coils_2 && type === "coils" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_coils_2} />
            <img alt={partId} className={photo_coils_3 && type === "coils" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_coils_3} />
            <img alt={partId} className={photo_RepairKit_1 && type === "repairkit" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_RepairKit_1} />
            <img alt={partId} className={photo_bar_1 && type === "bar" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_bar_1} />
            <img alt={partId} className={photo_bar_2 && type === "bar" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_bar_2} />
            <img alt={partId} className={photo_bar_3 && type === "bar" ? "photo-img" : "hidden"} onClick={showPopup} src={photo_bar_3} />
          </div>
          <div className={hideCar ? "car-result-content" : "hidden"}>
            <div className='details-header'>
              <h3 className='part-header'>{t("Part details") + partId}</h3>
              <button className='buy-now' onClick={goToShop}>
                {t("Buy now")}
              </button>
            </div>
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
              {t("Cylinders")}: {cylinders}
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
        <section className='details-results'>
          <SearchResults allCarsArray={cars} partId={partId} t={t} />
        </section>
      </div>
      <div className={hidePopup ? "popup hidden" : "popup"} onClick={closePopup}>
        <button className='close-popup' onClick={showPopup}>
          &#x2716;
        </button>
        <img alt={partId} className='popup__img' src={photoURL} />
        <button className='popup__arrow popup_arrow--left' onClick={previousIMG}>
          &#10094;
        </button>
        <button className='popup__arrow popup_arrow--right' onClick={nextIMG}>
          &#10095;
        </button>
      </div>
    </>
  );
}

export default Details;
