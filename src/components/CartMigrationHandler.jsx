// components/CartMigrationHandler.jsx
import React, { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useCart } from '../context/CartContext';

const CartMigrationHandler = () => {
  const { isSignedIn, userId } = useAuth();
  const { migrateGuestCart } = useCart();
  const [hasMigrated, setHasMigrated] = React.useState(false);
  const [lastUserId, setLastUserId] = React.useState(null);

  useEffect(() => {
    const handleMigration = async () => {
      if (isSignedIn && userId) {
        // Check if this is a new login (different user or first time)
        if (userId !== lastUserId || !hasMigrated) {
          await migrateGuestCart();
          setHasMigrated(true);
          setLastUserId(userId);
        }
      }
      
      if (!isSignedIn) {
        setHasMigrated(false);
      }
    };

    handleMigration();
  }, [isSignedIn, userId, migrateGuestCart, hasMigrated, lastUserId]);

  return null; // This component doesn't render anything
};

export default CartMigrationHandler;