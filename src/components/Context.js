import { createContext } from 'react';
import { dataVideoSet } from '../../dataSet';

const extractNumber = (str) => {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};
export const VideoContext = createContext();

export const searchAndSortVideos = (query) => {
  // Convertir la requête en minuscules et diviser en mots
  const lowerCaseQuery = query.toLowerCase();
  const queryWords = lowerCaseQuery.split(/\s+/); // Divise la requête en mots en utilisant des espaces comme délimiteurs
  let results = [];

  for (const video of dataVideoSet) {
    for (const vid of video.videos) {
      // Vérifier si au moins un mot de la requête est dans le titre de la vidéo principale
      const videoTitleLower = vid.videoTitle.toLowerCase();
      if (queryWords.some(word => videoTitleLower.includes(word))) {
        if (extractNumber(query)) {
          // Chercher un sous-vidéo dont le titre contient au moins un mot de la requête
          const subVideo = vid.subVideos.find(sub => 
            queryWords.some(word =>
              sub.videoTitle.toLowerCase().includes(word)
            )
          );
          if (subVideo) {
            results.push(subVideo);
          }
        } else {
          results.push(vid);
        }
      }
    }
  }

  // Trier les résultats par nombre de "likes" en gérant les valeurs nulles
  results.sort((a, b) => (b.videoLiked || 0) - (a.videoLiked || 0));
 
  return results;
};
