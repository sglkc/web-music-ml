import { Router } from 'express';
import { Song, SongGenres, Metadata, Artist, Genre, Language } from '../db/models';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const artists = await Artist.findAll();
    const songs = await Song.findAll();
    const response = [];

    songs.forEach((s) => {
      const song = s.toJSON();

      Object.keys(song.metadata).forEach((key) => {
        song[key] = song.metadata[key];
      });

      delete song.metadata;

      song.language = song.language_code;
      song.artist = song.artist?.name
        || artists.find((a) => a.artist_id == song.artist_id).name;
      song.genres = song.genres?.map((genre) => genre?.name) || [];
      song.length = song.length.slice(3);

      response.push(song);
    });

    return res.status(200).send(response);
  } catch (error) {
    console.error(error)
    return res.status(500).send({ error });
  }
});

router.get('/form', async (_, res) => {
  try {
    const artists = await Artist.findAll();
    const genres = await Genre.findAll();
    const languages = await Language.findAll();

    return res.status(200).send({ artists, genres, languages });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.get('/:song_id', async (req, res) => {
  const { song_id } = req.params;

  if (!song_id) return res.status(500).send({ error: 'song_id is required' });

  try {
    const artists = await Artist.findAll();
    const genres = await Genre.findAll();
    const languages = await Language.findAll();
    const s = await Song.findByPk(song_id);
    const song = s.toJSON();

    Object.keys(song.metadata).forEach((key) => {
      song[key] = song.metadata[key];
    });

    delete song.metadata;

    song.language = song.language_code;
    song.artist = song.artist.name;
    song.genres = song.genres.map((genre) => genre.name);
    song.length = song.length.slice(3);

    return res.status(200).send({ artists, genres, languages, song });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    const metadatas = {
      tempo: req.body.tempo,
      skey: req.body.skey,
      length: '00:' + req.body.length,
      popularity: req.body.popularity,
      energy: req.body.energy,
      speechiness: req.body.speechiness,
      danceability: req.body.danceability,
      positiveness: req.body.positiveness,
      liveness: req.body.positiveness
    };

    const metadata = await Metadata.create(metadatas);
    const { metadata_id } = metadata;
    const song = await Song.create({ metadata_id, ...req.body });
    const { song_id } = song;
    const genres = await Genre.findAll();

    for (const genreF of req.body.genres.split(',')) {
      const genre = genreF.trim();
      const found = genres.find((g) => g.name === genre);
      let genre_id = found?.genre_id;

      if (!found) {
        const newGenre = await Genre.create({ name: genre });
        genre_id = newGenre.genre_id;
      }


      await SongGenres.create({ song_id, genre_id });
    }

    return res.status(200).send(song.toJSON());
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }

});

router.patch('/:song_id', async (req, res) => {
  const { song_id } = req.params;

  if (!song_id) return res.status(500).send({ error: 'song_id is required' });

  try {
    const metadata = {
      tempo: req.body.tempo,
      skey: req.body.skey,
      length: '00:' + req.body.length,
      popularity: req.body.popularity,
      energy: req.body.energy,
      speechiness: req.body.speechiness,
      danceability: req.body.danceability,
      positiveness: req.body.positiveness,
      liveness: req.body.positiveness
    };

    const song = await Song.findByPk(song_id);

    await song.update(req.body);
    await Metadata.update(metadata, {
      where: {
        metadata_id: song.metadata_id
      }
    });

    await SongGenres.destroy({ where: { song_id }});

    const genres = await Genre.findAll();

    for (const genre of req.body.genres.split(',')) {
      const found = genres.find((g) => g.name === genre);

      if (!found) {
        await Genre.create({ name: genre });
      }

      await SongGenres.create({ song_id, genre_id: found.genre_id });
    }

    return res.status(200).send(song.toJSON());
  } catch (error) {
    console.error(error);
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
