import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(photoUrl) {
  const [photo, setPhoto] = useState(null);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [errorPhoto, setErrorPhoto] = useState(null);

  useEffect(() => {
    setLoadingPhoto(true);
    axios
      .get(photoUrl)
      .then((response) => {
        setPhoto(response.photo);
      })
      .catch((err) => {
        setErrorPhoto(err);
      })
      .finaly(() => {
        setLoadingPhoto(false);
      });
  }, [photoUrl]);
  return { photo, loadingPhoto, errorPhoto };
}
