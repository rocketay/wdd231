export async function getFoods() {
    try {
      const response = await fetch('data/foods.json');
      if (!response.ok) {
        throw new Error('Food data could not be loaded.');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  