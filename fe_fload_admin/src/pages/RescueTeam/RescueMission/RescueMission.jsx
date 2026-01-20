import MissionList from "./MissionList";
import MissionMap from "./MissionMap";
import MissionDetail from "./MissionDetail";
import MissionProgress from "./MissionProgress";
import "./RescueMission.css";

export default function RescueMission() {
  return (
    <div className="rescue-root">
      {/* LEFT: DANH SÁCH NHIỆM VỤ */}
      <MissionList />

      {/* CENTER + RIGHT */}
      <div className="rescue-main">
        {/* PROGRESS WORKFLOW */}
        <MissionProgress step={1} />

        {/* MAP */}
        <MissionMap />

        {/* DETAIL */}
        <MissionDetail />
      </div>
    </div>
  );
}
