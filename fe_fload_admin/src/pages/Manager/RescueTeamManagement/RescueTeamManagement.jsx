'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { FilterOutlined, DownloadOutlined, TeamOutlined, ThunderboltOutlined, CoffeeOutlined, UserOutlined } from '@ant-design/icons';
import TeamManagementList from '../../../components/ManagerComponents/rescue-team/TeamTable/TeamManagementList';
import ScheduleList from '../../../components/ManagerComponents/rescue-team/TeamSchedule/ScheduleList';
import './RescueTeamManagement.css';

const teamsData = [
  {
    id: 'TEAM-01',
    name: 'ALPHA TEAM',
    skill: 'Cứu hộ đường thủy',
    members: 3,
    status: 'active',
    mission: 'Sơ tán dân cư vùng B4',
    teamMembers: [
      { userId: 'MB-001', fullName: 'Trần Minh Quân', roleInTeam: 'Đội trưởng', phone: '0901234567' },
      { userId: 'MB-002', fullName: 'Phạm Văn Hùng', roleInTeam: 'Phó đội trưởng', phone: '0912345678' },
      { userId: 'MB-003', fullName: 'Nguyễn Thị Hoa', roleInTeam: 'Y tá', phone: '0923456789' },
      // ... các thành viên khác (bạn có thể giữ nguyên hoặc rút gọn)
    ],
  },
  {
    id: 'TEAM-04',
    name: 'MED-RESPONSE DELTA',
    skill: 'Y tế hiện trường',
    members: 1,
    status: 'rest',
    mission: '—',
    teamMembers: [
      { userId: 'MB-101', fullName: 'Nguyễn Hữu Long', roleInTeam: 'Đội trưởng', phone: '0934567890' },
      // ... các thành viên khác
    ],
  },
  {
    id: 'TEAM-07',
    name: 'TECH-RESCUE K9',
    skill: 'Tìm kiếm & Cứu nạn',
    members: 1,
    status: 'active',
    mission: 'Quét radar khu vực sạt lở',
    teamMembers: [
      { userId: 'MB-201', fullName: 'Đỗ Minh Trúc', roleInTeam: 'Đội trưởng', phone: '0945678901' },
      // ... các thành viên khác
    ],
  },
];

export default function RescueTeamManagement() {
  const [filterStatus, setFilterStatus] = useState('all');

  const handleStatClick = (status) => {
    setFilterStatus(status);
  };

  const getTeamsByStatus = (status) => {
    if (status === 'all') return teamsData;
    return teamsData.filter((t) => t.status === status);
  };

  const getStatValue = (status) => {
    if (status === 'all') return teamsData.length;
    if (status === 'active') return teamsData.filter((t) => t.status === 'active').length;
    if (status === 'rest') return teamsData.filter((t) => t.status === 'rest').length;
    return 0;
  };

  const totalMembers = teamsData.reduce((sum, team) => sum + team.members, 0);

  return (
    <div className="rescue-page">
      <div className="page-header">
        <div>
          <h2>Quản lý Đội cứu hộ</h2>
          <p>
            Giám sát và sắp xếp nhân sự cho các đội cứu hộ dưới quyền
            (UC-M08, UC-M18)
          </p>
        </div>

        <div className="header-actions">
          <Button icon={<FilterOutlined />}>Lọc</Button>
          <Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>
        </div>
      </div>

      <div className="stat-grid">
        <div onClick={() => handleStatClick('all')} style={{ cursor: 'pointer' }}>
          <StatCard
            title="TỔNG SỐ ĐỘI"
            value={getStatValue('all')}
            icon={<TeamOutlined />}
            active={filterStatus === 'all'}
          />
        </div>
        <div onClick={() => handleStatClick('active')} style={{ cursor: 'pointer' }}>
          <StatCard
            title="ĐANG LÀM NHIỆM VỤ"
            value={getStatValue('active')}
            icon={<ThunderboltOutlined />}
            green
            active={filterStatus === 'active'}
          />
        </div>
        <div onClick={() => handleStatClick('rest')} style={{ cursor: 'pointer' }}>
          <StatCard
            title="ĐANG NGHỈ / DỰ PHÒNG"
            value={getStatValue('rest')}
            icon={<CoffeeOutlined />}
            gray
            active={filterStatus === 'rest'}
          />
        </div>
        <StatCard
          title="NHÂN SỰ SẴN SÀNG"
          value={totalMembers}
          icon={<UserOutlined />}
        />
      </div>

      <TeamManagementList 
        teamsData={getTeamsByStatus(filterStatus)}
        filterStatus={filterStatus}
      />

      <ScheduleList />
    </div>
  );
}

function StatCard({ title, value, icon, green, gray, active }) {
  return (
    <div className={`stat-card ${green ? 'green' : ''} ${gray ? 'gray' : ''} ${active ? 'active' : ''}`}>
      <div className="stat-icon">{icon}</div>
      <span>{title}</span>
      <h2>{value}</h2>
    </div>
  );
}
