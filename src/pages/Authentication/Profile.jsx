import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata] = useState(null);
  // const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  // const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  useEffect(() => {
    const sendTestRequest = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);

        // const config = {
        //   url: `${apiServerUrl}/hello`,
        //   method: "GET",
        //   headers: {
        //     "content-type": "application/json",
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // }
        // const response = await axios(config);
        
        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
        const response = await axios.get(`${apiServerUrl}/hello`, config);

        const { data } = response;
        console.log(data);
      } catch (e) {
        console.log(JSON.stringify( e.message , null, 2 ));
      }
    };
  
    sendTestRequest();
  }, [getAccessTokenSilently, user?.sub, apiServerUrl]);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

export default Profile;