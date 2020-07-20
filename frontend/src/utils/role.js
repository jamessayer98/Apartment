export const isAdmin = role => role === 'ADMIN';

export const isRealtor = role => role === 'REALTOR';

export const isRealtorManageAllowed = role => role === 'ADMIN' || role === 'REALTOR';
