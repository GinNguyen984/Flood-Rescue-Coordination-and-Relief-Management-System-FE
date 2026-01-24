import ListTeamRescue from "../../../components/RescueCoordinatorComponents/ListTeamRescue/ListTeamRescue";
import DispatchMapView from "../../../components/RescueCoordinatorComponents/DispatchMap/DispatchMapView";

import "./rc-dispatch-layout.css";

export default function DispatchMapPage() {
  return (
    <div className="rc-dispatch">
      {/* LEFT */}
      <aside className="rc-dispatch__sidebar">
        <ListTeamRescue />
      </aside>

      {/* RIGHT */}
      <main className="rc-dispatch__main">
        <DispatchMapView />
      </main>
    </div>
  );
}
