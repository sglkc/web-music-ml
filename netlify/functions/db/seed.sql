-- table arits
INSERT INTO artists(artist_id, name, nationality) VALUES
(1, 'back number', 'Japanese'),
(2, 'Nidji', 'Indonesian');

-- tabel alngauges
INSERT INTO languages(language_code, country) VALUES
('JA', 'Japan'),
('ID', 'Indonesia');

-- table metadata
INSERT INTO metadata
(metadata_id, length, tempo, skey, loudness, popularity, energy, speechiness, instrumentalness, danceability, positiveness, liveness)
VALUES
(1, '00:05:14', 78, 'F# min', -3, 61, 65, 4, 0, 38, 33, 14),
(2, '00:03:58', 142, 'B Minor', -5, 55, 90, 30, 1, 62, 84, 29);

-- atabel lagu
INSERT INTO songs(artist_id, title, spotify_url, image_url, language_code, metadata_id) VALUES
(1, 'ハッピーエンド', 'https://open.spotify.com/track/4GqO80eGXA542oTvlYv4LS', 'https://i.scdn.co/image/ab67616d00001e02e09353d6028fda18c3699085', 'JA', 1),
(2, 'Biarlah', 'https://open.spotify.com/track/2bY1xVEU0seRJwgUT8Grjp', 'https://i.scdn.co/image/ab67616d0000b2737e7ca8820a1435577b8acf09', 'ID', 2);

-- genre
INSERT INTO genres(genre_id, subgenre_id, name) VALUES
(1, NULL, 'Pop'),
(2, NULL, 'Rock'),
(3, NULL, 'Pop Rock'),
(4, 1, 'Indonesian Pop'),
(5, 3, 'Indonesian Pop Rock'),
(6, NULL, 'Alternative Rock'),
(7, 1, 'J-Pop'),
(8, 2, 'J-Rock');

-- Masukakn ke lagu
INSERT INTO songgenres(song_id, genre_id) VALUES
(1, 7),
(1, 8),
(2, 4),
(2, 5),
(2, 6);

