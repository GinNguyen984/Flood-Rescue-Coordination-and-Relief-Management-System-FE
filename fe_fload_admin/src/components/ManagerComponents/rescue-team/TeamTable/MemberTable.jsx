'use client';

import { Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './MemberTable.css';

export default function MemberTable({ members, teamId }) {
  return (
    <div className="member-table-container">
      <div className="member-table-header">
        <h4>👥 Danh sách thành viên đội ({members.length})</h4>
      </div>

      <div className="member-table-wrapper">
        <div className="member-table-head">
          <span>ID</span>
          <span>HỌ TÊN</span>
          <span>ĐT LIÊN LẠC</span>
          <span>VỊ TRÍ TRONG ĐỘI</span>
          <span>HÀNH ĐỘNG</span>
        </div>

        {members.map((member) => (
          <MemberRow
            key={member.userId}
            {...member}
            teamId={teamId}
          />
        ))}
      </div>
    </div>
  );
}

function MemberRow({ userId, fullName, phone, roleInTeam, teamId }) {
  return (
    <div className="member-row">
      <div className="id-cell" data-label="ID">
        <strong>{userId}</strong>
      </div>

      <div className="name-cell" data-label="Họ tên">
        <strong>{fullName}</strong>
      </div>

      <div className="phone-cell" data-label="Điện thoại">
        {phone || '—'}
      </div>

      <div className="role-cell" data-label="Vị trí">
        <Tag color="blue">{roleInTeam || 'Thành viên'}</Tag>
      </div>

      <div className="actions-cell" data-label="Hành động">
        <Button size="small" type="text" icon={<EditOutlined />}>
          Sửa
        </Button>
        <Button
          size="small"
          type="text"
          danger
          icon={<DeleteOutlined />}
        >
          Xóa
        </Button>
      </div>
    </div>
  );
}