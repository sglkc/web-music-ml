-- hapus semua table jika ada
DROP TABLE IF EXISTS songgenres;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS metadata;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS artists;

-- table artists
CREATE TABLE artists(
  artist_id int primary key auto_increment,
  name varchar(64) not null,
  nationality varchar(16) not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);

-- table bahsaa
CREATE TABLE languages(
  language_code varchar(2) primary key,
  country varchar(32) not null
);

-- tabel metadata
CREATE TABLE metadata(
  metadata_id int primary key auto_increment,
  length time not null,
  tempo int(3) not null default 100,
  skey varchar(16) not null,
  loudness int(3) not null default 0,
  popularity int(3) not null default 0,
  energy int(3) not null default 0,
  speechiness int(3) not null default 0,
  instrumentalness int(3) not null default 0,
  danceability int(3) not null default 0,
  positiveness int(3) not null default 0,
  liveness int(3) not null default 0
);

-- tabel lagu
CREATE TABLE songs(
  song_id int primary key auto_increment,
  artist_id int not null,
  title varchar(64) not null,
  spotify_url varchar(128),
  image_url varchar(128),
  language_code varchar(2) not null,
  metadata_id int not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,
  foreign key (artist_id) references artists(artist_id) on update cascade,
  foreign key (language_code) references languages(language_code) on update cascade,
  foreign key (metadata_id) references metadata(metadata_id) on update cascade
);

-- tabel genre
CREATE TABLE genres(
  genre_id int primary key auto_increment,
  subgenre_id int,
  name varchar(32) not null,
  foreign key (subgenre_id) REFERENCES genres(genre_id) on update cascade
);

-- table genre musik
CREATE TABLE songgenres(
  song_id int,
  genre_id int,
  primary key (song_id, genre_id),
  foreign key (song_id) references songs(song_id) on update cascade,
  foreign key (genre_id) references genres(genre_id) on update cascade
);

