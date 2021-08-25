import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

const RediretToAccountDashboard = () => {
  useEffect(() => {
    navigate('/account/dashboard', { replace: true });
  }, []);

  return null;
};

export default RediretToAccountDashboard;
