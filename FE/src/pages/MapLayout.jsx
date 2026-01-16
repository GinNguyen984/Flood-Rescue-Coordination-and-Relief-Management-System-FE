import { Outlet } from "react-router-dom";
import MapHeader from "../components/MapHeader/MapHeader";

const MapLayout = () => {
  return (
    <>
      <MapHeader />
      <Outlet />
    </>
  );
};

export default MapLayout;
