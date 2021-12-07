import {
  IonContent,
  IonItem,
  IonPage,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonButton,
  IonSkeletonText,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SolidBrickImg from "../../../assets/solid_brick.png"
import MortarJoint from "../../../assets/mortar_joint.png";
import Header from "../../../components/Header/Header";
import WhatsappIcon from "../../../assets/whatsapp_icon.png";
import EmailIcon from "../../../assets/email_icon.png";
import TelegramIcon from "../../../assets/telegram_icon.png";
import { GET_CALCULATOR_RESULT_FETCH, SET_CALCULATOR_INFORMATION } from "../../../store/actions/calculator.actions";
import { dataFormatter } from "../../../utils/dataFormatter";
import useCommons from "../../../hooks/useCommons";

interface SolidBrickCalculatorProps {
  match: {
    params: {
      type: string;
    };
  };
  location: any;
}

const menuSolidBrick = [
  {
    brickType: "Ladrilo macizo",
    size: "(6 x 10 x 25)",
    linkTo: "/solid",
    type: "solid",
  },
  {
    brickType: "Perforado",
    size: "(6 x 10 x 25)",
    linkTo: "/perforated",
    type: "perforated",
  },
  {
    brickType: "Prensado",
    size: "(6 x 10 x 25)",
    linkTo: "/pressing",
    type: "pressing",
  },
  {
    brickType: "Ladrillo macizo",
    size: "(Selección dimensiones)",
    linkTo: "/personalized",
    type: "personalized",
  },
];

const SolidBrickCalculator: React.FC<SolidBrickCalculatorProps> = ({
  match,
  location,
}) => {
  const dispatch = useDispatch();
  const { loading } = useCommons();
  const { result } = useSelector((state: any) => state.calculator)
  const [Brick, setBrick] = useState(Object || null);
  const [calculate, setCalculate] = useState<boolean>(false);
  const [wallArea, setWallArea] = useState<number>(0);
  const [wallOpenings, setWallOpenings] = useState<number>(0);
  const [wallThickness, setWallThickness] = useState<number>(0);
  let calculatorName = localStorage.getItem("brick-name") as string;
  let calculatorSize = localStorage.getItem("brick-size") as string;

  useEffect(() => {
    setBrick(
      menuSolidBrick.filter((item) => item.type === match.params.type)[0]
    );
  }, [match]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch({
      type: SET_CALCULATOR_INFORMATION,
      payload: {
        name: `${calculatorName}-${calculatorSize}`,
        data: {
          wallArea,
          wallOpenings,
          wallThickness,
        },
      },
    });
    dispatch({
      type: GET_CALCULATOR_RESULT_FETCH,
      payload: {
        name: `${calculatorName}-${calculatorSize}`,
        data: {
          wallArea,
          wallOpenings,
          wallThickness,
        },
      },
    });
    setCalculate(true);
  };

  return (
    <IonPage>
      <Header canBack href="/calculator/walls/brick" />
      <IonContent className="Foundation-content__style">
        <form onSubmit={submitHandler}>
          {!calculate ? (
            <>
              <IonItem
                className="ion-margin-top ion-margin-horizontal"
                color="primary"
              >
                <img
                  slot="start"
                  src={SolidBrickImg}
                  className="Foundation-sidepanel__img"
                  alt=""
                />
                <IonGrid>
                  <IonRow>
                    <IonCol size="12" className="ion-text-center">
                      <IonText>
                        <h4>{Brick.brickType}</h4>
                      </IonText>
                    </IonCol>
                    <IonCol className="ion-text-center">
                      <IonText>
                        <h6>{Brick.size}</h6>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem className="ion-margin-horizontal">
                <IonGrid>
                  <IonRow>
                    <p>Área del Muro:</p>
                  </IonRow>
                  <IonRow className="ion-justify-content-center ion-align-items-center">
                    <IonCol size="6">
                      <h5>Ingrese Área (m2): </h5>
                    </IonCol>
                    <IonCol size="6" className="ion-text-center">
                      <IonInput
                        value={wallArea}
                        type="number"
                        required
                        min="0.1"
                        onIonChange={(e) =>
                          setWallArea(parseInt(e.detail.value!))
                        }
                      />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem className="ion-margin-horizontal">
                <IonGrid>
                  <IonRow>
                    <p>Área aperturas:</p>
                  </IonRow>
                  <IonRow className="ion-justify-content-center ion-align-items-center">
                    <IonCol size="6">
                      <h5>Área descontada por (Puertas, Ventanas) (m2): </h5>
                    </IonCol>
                    <IonCol size="6" className="ion-text-center">
                      <IonInput
                        value={wallOpenings}
                        type="number"
                        required
                        min="0.1"
                        onIonChange={(e) =>
                          setWallOpenings(parseInt(e.detail.value!))
                        }
                      />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem className="ion-margin-horizontal">
                <IonGrid>
                  <IonRow>
                    <p>Área aperturas:</p>
                  </IonRow>
                  <IonRow className="ion-justify-content-center ion-align-items-center">
                    <IonCol size="6">
                      <img src={MortarJoint} alt="" />
                    </IonCol>
                    <IonCol size="6" className="ion-text-center">
                      <IonLabel position="floating">Espesor (cm)</IonLabel>
                      <IonInput
                        type="number"
                        value={wallThickness}
                        required
                        min="0.1"
                        onIonChange={(e) =>
                          setWallThickness(parseInt(e.detail.value!))
                        }
                      />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonButton
                expand="full"
                size="large"
                className="ion-margin-horizontal"
                type="submit"
              >
                Calcular
              </IonButton>
            </>
          ) : (
            <BrickResult {...Brick} loading={loading} result={result} />
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

interface BrickResultProps {
  brickType: string;
  size: string;
  sizeBrick: string;
  loading: boolean;
  result: any;
}

const BrickResult: React.FC<BrickResultProps> = ({
  brickType,
  size,
  loading,
  result
}) => {
  return (
    <>
      <IonItem className="ion-margin-top ion-margin-horizontal" color="primary">
        <img
          slot="start"
          src={SolidBrickImg}
          className="Foundation-sidepanel__img"
          alt=""
        />
        <IonGrid>
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <IonText>
                <h4>{brickType}</h4>
              </IonText>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonText>
                <h6>{size}</h6>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem className="ion-margin-horizontal">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem className="ion-text-center" color="primary">
                <h4>TOTAL MATERIALES</h4>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">Descripción</IonCol>
            <IonCol className="ion-text-center">Cantidad</IonCol>
            <IonCol className="ion-text-center">Unidad</IonCol>
          </IonRow>
          {loading ? (
            <>
              <IonRow>
                <IonSkeletonText animated style={{ width: "100%" }} />
              </IonRow>
              <IonRow>
                <IonSkeletonText animated style={{ width: "100%" }} />
              </IonRow>
              <IonRow>
                <IonSkeletonText animated style={{ width: "100%" }} />
              </IonRow>
              <IonRow>
                <IonSkeletonText animated style={{ width: "100%" }} />
              </IonRow>
              <IonRow>
                <IonSkeletonText animated style={{ width: "100%" }} />
              </IonRow>
              <IonRow>
                <IonSkeletonText animated style={{ width: "100%" }} />
              </IonRow>
            </>
          ) : (
            <>
              {result.map(
                ({
                  name,
                  cuantity,
                  unit,
                }: {
                  name: string;
                  cuantity: string;
                  unit: string;
                }) => (
                  <IonRow key={name} className="ion-padding-vertical">
                    <IonCol className="ion-text-center">
                      {dataFormatter[name]}
                    </IonCol>
                    <IonCol className="ion-text-center">{cuantity}</IonCol>
                    <IonCol className="ion-text-center">{unit}</IonCol>
                  </IonRow>
                )
              )}
            </>
          )}
          <IonRow>
            <IonCol className="ion-text-center">
              <img
                src={WhatsappIcon}
                className="Foundation-Result__icon"
                alt="whatsapp"
              />
            </IonCol>
            <IonCol className="ion-text-center">
              <img
                src={TelegramIcon}
                className="Foundation-Result__icon"
                alt="telegram"
              />
            </IonCol>
            <IonCol className="ion-text-center">
              <img
                src={EmailIcon}
                className="Foundation-Result__icon"
                alt="email"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </>
  );
};

export default SolidBrickCalculator;
