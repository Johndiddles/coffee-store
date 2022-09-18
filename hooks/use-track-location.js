import { useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/storeContext";

const useTrackLocation = () => {
  const { dispatch } = useContext(StoreContext);
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  // const [latLong, setLatLong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: {
        latLong: `${latitude},${longitude}`,
      },
    });
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };
  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location ");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Your browser does not support Geolocation");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  };
};

export default useTrackLocation;
