import { mockData } from "./mock-data";
import NProgress from "nprogress";
import axios from "axios";

// const getToken = async (code) => {
//   const encodeCode = encodeURIComponent(code);
//   const response = await fetch(
//     "https://rs80bt6xd1.execute-api.us-east-1.amazonaws.com/dev/api/token" +
//       "/" +
//       encodeCode
//   );
//   const { access_token } = await response.json();
//   access_token && localStorage.setItem("access_token", access_token);
//   return access_token;
// };

// export const checkToken = async (accessToken) => {
//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
//     );
//     return await response.json();
//   } catch (error) {
//     error.json();
//   }
// };

// const removeQuery = () => {
//   if (window.history.pushState && window.location.pathname) {
//     var newurl =
//       window.location.protocol +
//       "//" +
//       window.location.host +
//       window.location.pathname;
//     window.history.pushState("", "", newurl);
//   } else {
//     newurl = window.location.protocol + "//" + window.location.host;
//     window.history.pushState("", "", newurl);
//   }
// };

// export const extractLocations = (events) => {
//   var extractLocations = events.map((event) => event.location);
//   var locations = [...new Set(extractLocations)];
//   return locations;
// };

// export const getEvents = async () => {
//   NProgress.start();

//   if (window.location.href.startsWith("http://localhost")) {
//     NProgress.done();
//     return mockData;
//   }

//   if (!navigator.onLine) {
//     const data = localStorage.getItem("lastEvents");
//     console.log(data);
//     NProgress.done();
//     return data ? JSON.parse(data).events : [];
//   }

//   const token = await getAccessToken();

//   if (token) {
//     removeQuery();
//     const url =
//       "https://rs80bt6xd1.execute-api.us-east-1.amazonaws.com/dev/api/get-events" +
//       "/" +
//       token;

//     const response = await fetch(url);
//     const result = await response.json();

//     if (result) {
//       console.log(result);
//       var locations = extractLocations(result.events);
//       localStorage.setItem("lastEvents", JSON.stringify(result));
//       localStorage.setItem("locations", JSON.stringify(locations));
//     }
//     NProgress.done();
//     return result.events;
//   }
// };

// export const getAccessToken = async () => {
//   const accessToken = localStorage.getItem("access_token");
//   const tokenCheck = accessToken && (await checkToken(accessToken));

//   if (!accessToken || tokenCheck.error) {
//     await localStorage.removeItem("access_token");
//     const searchParams = new URLSearchParams(window.location.search);
//     const code = await searchParams.get("code");

//     if (!code) {
//       const response = await fetch(
//         "https://rs80bt6xd1.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
//       );
//       const results = await response.json();
//       console.log(results);
//       const { authUrl } = results;
//       return (window.location.href = authUrl);
//     }
//     return code && getToken(code);
//   }
//   return accessToken;
// };

//////

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }
  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    console.log(localStorage);
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }
  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      "https://rs80bt6xd1.execute-api.us-east-1.amazonaws.com/dev/api/get-events" +
      "/" +
      token;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};
console.log(localStorage);

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    "https://rs80bt6xd1.execute-api.us-east-1.amazonaws.com/dev/api/token" +
      "/" +
      encodeCode
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

export const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        "https://rs80bt6xd1.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
