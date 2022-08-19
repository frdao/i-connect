import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';

type Props = {
	auth: boolean;
	setAuth: (val: boolean) => void;
};

const Login: React.FC<Props> = ({auth, setAuth}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Login page" />
      </IonContent>
			<IonButton color="secondary" onClick={() => setAuth(true)}>Log In</IonButton>
    </IonPage>
  );
};

export default Login;
