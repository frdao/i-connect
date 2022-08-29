import React, { useEffect, useRef } from "react";
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCardContent, IonItem, IonImg, IonIcon, IonLabel, IonButton,
    createGesture, Gesture, GestureConfig
} from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { IonicReactExternalProps } from '@ionic/react/dist/types/components/utils';
import SwipeCard from "../components/SwipeCard";


const Tab2: React.FC = () => {

  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Swipe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <SwipeCard />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
