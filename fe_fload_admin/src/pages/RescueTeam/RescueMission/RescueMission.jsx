import MissionList from "../../../components/RescueTeamComponents/MissionList";
import MissionQuickNotify from "../../../components/RescueTeamComponents/MissionQuickNotify";
import "./RescueMission.css";

export default function RescueMission() {
  return (
    <div className="rm-layout">
      {/* LEFT: DANH SÁCH NHIỆM VỤ */}
      <aside className="rm-layout__left">
        <MissionList />
      </aside>

      {/* RIGHT: THÔNG BÁO NHANH */}
      <aside className="rm-layout__right">
        <MissionQuickNotify />
      </aside>
    </div>
  );
}
