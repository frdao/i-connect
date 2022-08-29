import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonHeader, IonInput } from '@ionic/react';
import './Login.css';

type Props = {
	setAuth: (val: boolean) => void;
};

const Login: React.FC<Props> = ({setAuth}) => {
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
							<IonButton className="loginButton" color="secondary" onClick={() => setAuth(true)}>Log In</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
    </IonPage>
  );
};

export default Login;
