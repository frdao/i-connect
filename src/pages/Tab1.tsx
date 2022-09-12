import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Conversation from '../components/Conversation';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connect</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id='mainContainer'>
        <Conversation/>
      </IonContent> 
    </IonPage>
  );
};

export default Tab1;
