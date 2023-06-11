import { Router } from 'express';
import { Song } from './db/models';

const router = Router();

router.get('/', async (_, res) => {
  const songs = await Song.findAll();
  const response = [];

  songs.forEach((s) => {
    const song = s.toJSON();

    song.artist = song.artist.name;
    song.genre = song.genre.name;

    Object.keys(song.metadata).forEach((key) => {
      song[key] = song.metadata[key];
    });

    delete song.metadata;

    response.push(song);
  });

  return res.status(200).send(response);
});

export default router;
