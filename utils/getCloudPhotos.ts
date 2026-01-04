export async function getICloudPhotos(albumUrl: string) {
  try {
    const response = await fetch(albumUrl);

    const html = await response.json();
    console.log(html);

    const photos = [];

    return photos;
  } catch (error) {
    console.error('Error fetching iCloud photos:', error);
    return [];
  }
}
