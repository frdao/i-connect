import { IonPage, IonButton, IonGrid, IonRow, IonCol, IonHeader, IonInput } from '@ionic/react';
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
		<IonGrid className='loginGrid'>
			<IonRow>
				<IonCol>
					<IonHeader className='loginHeader'>Log In</IonHeader>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCol>
					<IonInput className="userInput" placeholder='Email'></IonInput>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCol>
					<IonInput className="userInput" placeholder='Password'></IonInput>
				</IonCol>
			</IonRow>
			<IonRow>
				<IonCol>
					<IonButton className="loginButton" color="secondary" onClick={() => handleLogin(instance)}>Log In</IonButton>
				</IonCol>
			</IonRow>
		</IonGrid>
    </IonPage>
  );
};

export default Login;
