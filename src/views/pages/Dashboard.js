import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <div className="m-t-xxl ">
        <NavLink to={'/account'} className="btn btn-primary">
          Account
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
