import { useCallback, useEffect, useState } from "react";

// ITS CALLED A HELPER FUNCTION WWHICH WE WILLL USE IN THE BELOW HOOK
// NOTE: This func is dealing with sending request
async function sendHttpRequest(url, config) {
  
  const response = await fetch(url, config); 

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong,Failed to send request."
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) { // <= AND THIS IS A CUSTOM HOOK

  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, SetError] = useState();

  function clearData() {
    setData(initialData);
  }

  //  <= WHILE THIS FUNCTION INSIDE HOOK WILL BE DEALING ABOUT UPDATING STATE BASED ON THE OLD REQUEST STATUS 
  const sendRequest = useCallback( 
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {...config , body:data});
        setData(resData);
      } catch (error) {
        SetError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && config.method === "GET" || !config.method || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
