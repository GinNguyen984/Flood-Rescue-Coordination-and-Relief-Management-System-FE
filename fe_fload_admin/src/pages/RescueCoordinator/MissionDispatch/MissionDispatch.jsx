import { useState } from "react";

import MissionList from "../../../components/RescueCoordinatorComponents/MissionList";
import MissionDetail from "../../../components/RescueCoordinatorComponents/Veryfi/MissionDetail";

import "./rc-mission-dispatch.layout.css";

export default function MissionDispatch() {

  const [selectedMission, setSelectedMission] = useState(null);

  return (
    <div className="rc-mission-dispatch">

      {/* LEFT */}
      <aside className="rc-mission-dispatch__sidebar">
        <MissionList onSelectMission={setSelectedMission} />
      </aside>

      {/* RIGHT */}
      <section className="rc-mission-dispatch__detail">
        <MissionDetail mission={selectedMission} />
      </section>

    </div>
  );
}