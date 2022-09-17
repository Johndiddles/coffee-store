import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getCoffeeStoreUrl = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}&v=20210525`;
};

const getCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee",
    page: 1,
    perPage: 40,
    orientation: "landscape",
  });

  const unsplashReults = photos?.response?.results;
  return unsplashReults.map((result) => result?.urls["small"]);
};

export const fetchCoffeeStores = async (
  latlong = "43.7182412,-79.3780581",
  limit = 6
) => {
  const photos = await getCoffeeStorePhotos();
  console.log("photos: ", photos);

  const resp = await fetch(getCoffeeStoreUrl(latlong, "coffee", limit), {
    headers: {
      Authorization: "fsq33AAc7hc9u7JN/MqxPu0SQwzX1OD2AvYUOKATR0RWWzM=",
    },
  });

  const data = await resp.json();

  return data?.results.map((venue, idx) => {
    return {
      ...venue,
      imageUrl: photos[idx],
    };
  });
};
