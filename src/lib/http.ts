export async function httpGet(API_URL: string | URL | Request) {
    try {
      const response = await fetch(API_URL, { cache: 'force-cache' });
      // console.log("uri",API_URL);
      if (!response.ok) {
        console.error(`Error ${response.status}: ${response.statusText}`);
        throw new Error('Failed to fetch matches');
      }
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }