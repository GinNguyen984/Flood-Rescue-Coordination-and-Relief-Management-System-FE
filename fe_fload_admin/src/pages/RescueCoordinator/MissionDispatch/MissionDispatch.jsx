import MissionList from "./MissionList";
import RescueMap from "./RescueMap";
import AvailableResources from "./AvailableResources";
import "./MissionDispatch.css";

export default function MissionDispatch() {
  return (
    <div className="dispatch-layout">
      <MissionList />
      <RescueMap />
      <AvailableResources />
    </div>
  );
}
