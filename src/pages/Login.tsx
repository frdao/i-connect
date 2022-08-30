import { IonPage, IonButton, IonGrid, IonRow, IonCol, IonHeader, IonInput, IonContent } from '@ionic/react';
import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import './Login.css';
import { IPublicClientApplication } from '@azure/msal-browser';

function handleLogin(instance: IPublicClientApplication) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}
const Login: React.FC = () => {
	const {instance} = useMsal();

  return (
    <IonPage>
      <IonButton className="loginButton" color="secondary" onClick={() => handleLogin(instance)}>Sign in with Microsoft</IonButton>
    </IonPage>
  );
};

export default Login;
