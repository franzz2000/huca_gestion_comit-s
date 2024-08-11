// src/components/Members/MemberList.js
import React, { useState, useEffect } from 'react';
import { getAllMembers } from '../../services/memberService';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await getAllMembers();
      setMembers(response.data);
    };
    fetchMembers();
  }, []);

  return (
    <div>
      <h2>Miembros</h2>
      <ul>
        {members.map(member => (
          <li key={member._id}>{member.name} {member.surname} {member.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;