import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Depot, getDepotData } from "./mockAPI";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import L from "leaflet";
import markerIcon from "./marker-icon.svg";
import carIcon from "./car-icon.png";
import tickIcon from "./thick.svg";

type Version = string;

const myIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

function App() {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [bounds, setBounds] = useState<LatLngTuple[]>();

  useEffect(() => {
    (async () => {
      try {
        const depots = await getDepotData();
        const depotBounds = depots.map(
          (depot) => [+depot.latitude, +depot.longitude] as LatLngTuple
        );
        setBounds(depotBounds);
        setDepots(depots);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const [version, setVersion] = useState<Version | null>(null);
  const [loadingVersion, setLoadingVersion] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { version },
        } = await Axios.get(
          "https://cors-anywhere.herokuapp.com/https://platform.immense.ai/api/v2/version"
        );

        setVersion(version);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingVersion(false);
      }
    })();
  }, []);

  return (
    <div>
      <Header>
        <img src={carIcon} height="20" alt={"a nice car icon"} />
        &nbsp;
        <HeaderVersion>
          Fleet Management v{loadingVersion ? "..." : version}
        </HeaderVersion>
      </Header>
      <Main>
        <Sidebar></Sidebar>
        <Map>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {bounds && <SetBounds bounds={bounds} />}
          {depots.map((depot) => (
            <Marker
              icon={myIcon}
              key={depot.stationName}
              position={[+depot.latitude, +depot.longitude]}
            >
              <Popup>
                <Row>
                  <div>
                    <Label>Name</Label>
                    <PopoverStationName>{depot.stationName}</PopoverStationName>
                  </div>
                </Row>
                <Row>
                  <div>
                    <Label>Is it a depot?</Label>
                    <BooleanField hasProp={depot.isDepot} />
                  </div>
                  <div>
                    <Label>Latitude</Label>
                    <Value>{depot.latitude}</Value>
                  </div>
                  <div>
                    <Label>Longitude</Label>
                    <Value>{depot.longitude}</Value>
                  </div>
                </Row>
                <PopoverSectionTitle>Refuel</PopoverSectionTitle>
                <Row>
                  <div>
                    <Label>Diesel</Label>
                    <BooleanField hasProp={depot.isFuelDiesel} />
                  </div>
                  <div>
                    <Label>Petrol</Label>
                    <BooleanField hasProp={depot.isFuelPetrol} />
                  </div>
                </Row>
                <PopoverSectionTitle>Recharge</PopoverSectionTitle>
                <Row>
                  <div>
                    <Label>Residential</Label>
                    <BooleanField hasProp={depot.isElectricResidential} />
                  </div>
                  <div>
                    <Label>Public</Label>
                    <BooleanField hasProp={depot.isFuelPetrol} />
                  </div>
                  <div>
                    <Label>Fast</Label>
                    <BooleanField hasProp={depot.isElectricFast} />
                  </div>
                  <div>
                    <Label>Rapid</Label>
                    <BooleanField hasProp={depot.isElectricRapidDC} />
                  </div>
                  <div>
                    <Label>Bays</Label>
                    <Value>{depot.bays}</Value>
                  </div>
                </Row>
              </Popup>
            </Marker>
          ))}
        </Map>
      </Main>
    </div>
  );
}

const SetBounds = ({ bounds }: { bounds: LatLngTuple[] }) => {
  const map = useMap();
  map.fitBounds(bounds);

  return null;
};

const BooleanField = ({ hasProp }: { hasProp: boolean }) => {
  return hasProp ? (
    <div role="img" aria-label="yes">
      <img src={tickIcon} alt={"tick icon"} />
    </div>
  ) : (
    <Value role="img" aria-label="no">
      -
    </Value>
  );
};

const Header = styled.div`
  background-color: #0b1b26; // #dark-blue-grey
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 20px;
  height: 50px;
`;

const Map = styled(MapContainer)`
  width: 100%;
  height: calc(100vh - 50px);
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 1em;

  & > * + * {
    margin-left: 1em;
  }
`;

const PopoverSectionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  color: #0b1b26; //dark-blue-grey
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #4833ff; //light-royal-blue
`;

const PopoverStationName = styled.div`
  color: #0054ff; // #electric-blue
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
`;

const Main = styled.main`
  display: flex;
`;

const HeaderVersion = styled.div`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  color: #ffffff;
`;

const Sidebar = styled.section`
  width: 279px;
  background-color: #c2c2c2; //use #pinkish-grey
  flex-shrink: 0;
`;

export default App;
