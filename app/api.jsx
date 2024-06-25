
export const fetchUsers = async (pageNumber = 1, pageSize = 10) => {
    const url = `https://dummyjson.com/users?page=${pageNumber}&size=${pageSize}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data.users.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        image: user.image
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  