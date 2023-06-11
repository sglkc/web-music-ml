import { Router } from 'express';
import { Artist } from '../db/models';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const artists = await Artist.findAll();
    return res.status(200).send(artists.toJSON());
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    return res.status(200).send(artist.toJSON());
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.patch('/:artist_id', async (req, res) => {
  const { artist_id } = req.params;

  if (!artist_id) return res.status(500).send({ error: 'artist_id is required' });

  try {
    const artist = await Artist.findByPk(artist_id);

    await artist.update(req.body);
    return res.status(200).send(artist.toJSON());
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.delete('/:artist_id', async (req, res) => {
  const { artist_id } = req.params;

  if (!artist_id) return res.status(500).send({ error: 'artist_id is required' });

  try {
    await Artist.destroy({ where: { artist_id }});
    return res.status(200).send({ message: 'deleted artist' });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

export default router;
