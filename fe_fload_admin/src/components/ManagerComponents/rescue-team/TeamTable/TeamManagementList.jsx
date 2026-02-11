'use client';

import { useState } from 'react';
import { Button, Tag } from 'antd';
import {
  PlusOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined
} from '@ant-design/icons';

import './TeamManagementList.css';
import MemberTable from './MemberTable';

export default function TeamManagementList({ teamsData, filterStatus }) {
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  const handleTeamClick = (teamId) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <span className="active">📋 Danh sách đội cứu hộ</span>
        </div>
        <div className="header-actions">
          <Button icon={<PlusOutlined />} >Tạo Đội Cứu Hộ</Button>
          {/* <Button icon={<FilterOutlined />}>Lọc</Button> */}
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-head">
          
          <span>TÊN ĐỘI</span>
          <span>CHUYÊN MÔN CHÍNH</span>
          <span>THÀNH VIÊN</span>
          <span>TRẠNG THÁI</span>
          <span>NHIỆM VỤ HIỆN TẠI</span>
          <span>HÀNH ĐỘNG</span>
        </div>

        {teamsData.map((team) => (
          <div key={team.id}>
            <TeamRow
              {...team}
              isExpanded={expandedTeamId === team.id}
              onTeamClick={() => handleTeamClick(team.id)}
            />
            {expandedTeamId === team.id && (
              <MemberTable members={team.teamMembers} teamId={team.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamRow({ id, name, skill, members, status, mission, teamMembers, isExpanded, onTeamClick }) {
  return (
    <>
      <div className="table-row">
        <div className="team-info">
        <button className="expand-btn" onClick={onTeamClick}>
          {isExpanded ? <UpOutlined /> : <DownOutlined />}
        </button>
          <div>
            <strong>{name}</strong>
        
          </div>
        </div>

        <div>{skill}</div>

        <div>{members} nhân viên</div>

        <div>
          {status === 'active' ? (
            <Tag color="green">ĐANG LÀM NHIỆM VỤ</Tag>
          ) : (
            <Tag>ĐANG NGHỈ</Tag>
          )}
        </div>

        <div className="mission">{mission}</div>

        <div className="actions">
          <Button size="small" type="text" icon={<EditOutlined />}>Sửa</Button>
          <Button size="small" type="text" danger icon={<DeleteOutlined />}>Xóa</Button>
        </div>
      </div>
    </>
  );
}
