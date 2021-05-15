import {
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonMenuButton,
} from "@ionic/react";
import React from "react";
import { useHistory } from 'react-router';

type Props = {
  title?: string,
  canBack?: boolean,
};

const Header: React.FC<Props> = ({ title, canBack = true }) => {

  return (
    <IonHeader>
      <IonToolbar>
        {canBack && (
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        )}
        <IonTitle>{title || "Construclick"}</IonTitle>
        <IonButtons slot="end">
          <IonMenuButton autoHide={false} />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
