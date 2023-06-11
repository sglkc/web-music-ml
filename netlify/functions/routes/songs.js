import { Router } from 'express';
import { Song, SongGenres, Metadata } from '../db/models';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const songs = await Song.findAll();
    const response = [];

    songs.forEach((s) => {
      const song = s.toJSON();

      Object.keys(song.metadata).forEach((key) => {
        song[key] = song.metadata[key];
      });

      delete song.metadata;

      song.language = song.language_code;
      song.artist = song.artist.name;
      song.genre = song.genre.map((genre) => genre.name);
      song.length = song.length.slice(3)

      response.push(song);
    });

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.patch('/:song_id', async (req, res) => {
  const { song_id } = req.params;

  if (!song_id) return res.status(500).send({ error: 'song_id is required' });

  try {
    const { metadata } = req.body;
    const song = await Song.findByPk(song_id);

    await song.update(req.body);

    if (Object.keys(metadata)) {
      await Metadata.update(metadata, {
        where: {
          metadata_id: song.metadata_id
        }
      })
    }

    return res.status(200).send(song.toJSON());
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.delete('/:song_id', async (req, res) => {
  const { song_id } = req.params;

  if (!song_id) return res.status(500).send({ error: 'song_id is required' });

  try {
    const song = await Song.findByPk(song_id);

    await SongGenres.destroy({ where: { song_id }});
    await song.destroy();
    await Metadata.destroy({ where: { metadata_id: song.metadata_id }});

    return res.status(200).send(song.toJSON());
  } catch (error) {
    return res.status(500).send({ error });
  }
});

export default router;
