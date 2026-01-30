import { useEffect, useState } from "react";
import { Tag } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./rc-list-team-rescue.css";

/* ===== MOCK DATA ===== */
const initialRequests = [
  {
    id: "#1234",
    title: "Ngập lụt Huỳnh Tấn Phát",
    location: "Quận 7, TP.HCM",
    tags: ["KHẨN CẤP", "Y TẾ"],
    createdAt: Date.now() - 2 * 60 * 1000,
    level: "urgent",
  },
  {
    id: "#1235",
    title: "Cây đổ chắn đường",
    location: "Nguyễn Văn Linh, Q7",
    tags: ["TRUNG BÌNH"],
    createdAt: Date.now() - 15 * 60 * 1000,
    level: "medium",
  },
  {
    id: "#1236",
    title: "Hỗ trợ di dời dân",
    location: "Tân Thuận, Q7",
    tags: ["THEO DÕI"],
    createdAt: Date.now() - 24 * 60 * 1000,
    level: "low",
  },
];

const timeAgo = (time) => {
  const diff = Math.floor((Date.now() - time) / 60000);
  return `${diff} phút trước`;
};

export default function ListTeamRescue() {
  const [data, setData] = useState(initialRequests);
  const [, force] = useState(0);

  /* REAL TIME UPDATE */
  useEffect(() => {
    const timer = setInterval(() => force((v) => v + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="rc-queue">
      <div className="rc-queue__header">
        <div>
          <h3>CHỜ ĐIỀU PHỐI ({data.length})</h3>
          <span className="rc-queue__sub">
            Yêu cầu khẩn cấp cần xử lý ngay
          </span>
        </div>

        <span className="rc-queue__live">REAL-TIME</span>
      </div>

      <div className="rc-queue__list">
        {data.map((item) => (
          <div
            key={item.id}
            className={`rc-queue__card ${item.level}`}
          >
            <div className="rc-queue__top">
              <Tag color="red">{item.tags[0]}</Tag>
              <span>{timeAgo(item.createdAt)}</span>
            </div>

            <h4>{item.title}</h4>

            <div className="rc-queue__location">
              <EnvironmentOutlined />
              {item.location}
            </div>

            <div className="rc-queue__tags">
              {item.tags.slice(1).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
