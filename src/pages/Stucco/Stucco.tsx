import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";


import "./Stucco.css"
import Header from "../../components/Header/Header";
import StuccoImg from "../../assets/stucco.png";
import AcrylicStuccoImg from "../../assets/acrylic_stucco.png"

interface StuccoProps{
  match: {
    url: string;
  };
}

interface menuStuccoProps{
  type: string;
  linkTo: string;
  imgSrc: string;
}

const menuStucco= [
  { type: "Estuco Liso", linkTo: "smooth-stucco", imgSrc: StuccoImg },
  { type: "Estuco Acrilico", linkTo: "acrylic-stucco", imgSrc: AcrylicStuccoImg }
]

const Stucco:React.FC<StuccoProps> = ({ match }) => {
  return (
    <IonPage>
      <IonPage>
        <IonContent fullscreen className="Stucco-content__style">
          <Header canBack href="/calculator" />
          <IonCard>
            <IonCardHeader className="Stucco-menu__style">
              <IonCardTitle className="ion-text-center">
                Estuco
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {menuStucco.map(
                ({ type, linkTo, imgSrc }: menuStuccoProps) => (
                  <IonItem
                    lines="none"
                    className="ion-margin-vertical"
                    button
                    routerLink={`${match.url}/${linkTo}`}
                    key={linkTo}
                  >
                    <img
                      src={imgSrc}
                      slot="start"
                      className="Stucco-image__style"
                      alt=""
                    />
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12">
                          <IonText>{type}</IonText>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                )
              )}
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </IonPage>
  )
}


export default Stucco