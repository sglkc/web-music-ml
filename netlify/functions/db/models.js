const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'projekbasdat',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  logging: process.env.NODE_ENV === 'development' && console.log
});

const Artist = sequelize.define('artists', {
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
  },
}, {
  tableName: 'artists',
});

const Language = sequelize.define('languages', {
  language_code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    primaryKey: true
  },
  country: {
    type: DataTypes.STRING(32),
    allowNull: false
  }
}, {
  tableName: 'languages',
  timestamps: false
});

const Metadata = sequelize.define('metadata', {
  metadata_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  length: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  tempo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  skey: { type: DataTypes.STRING(16), allowNull: false },
  loudness: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  popularity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  energy: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  speechiness: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  instrumentalness: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  danceability: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  positiveness: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  liveness: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
  tableName: 'metadata',
  timestamps: false
});

const Song = sequelize.define('songs', {
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Artist,
      key: 'artist_id',
    }
  },
  title: { type: DataTypes.STRING(64), allowNull: false },
  spotify_url: { type: DataTypes.STRING(128) },
  image_url: { type: DataTypes.STRING(128) },
  language_code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    references: {
      model: Language,
      key: 'language_code'
    }
  },
  metadata_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Metadata,
      key: 'metadata_id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
  },
}, {
  defaultScope: {
    include: [{ all: true }]
  },
  tableName: 'songs'
});

const Genre = sequelize.define('genres', {
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subgenre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Genre,
      key: 'genre_id',
    }
  },
  name: {
    type: DataTypes.STRING(32),
    allowNull: false
  }
}, {
  tableName: 'genres',
  timestamps: false
});

const SongGenres = sequelize.define('songgenres', {
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Song,
      key: 'song_id',
    }
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Genre,
      key: 'genre_id',
    }
  },
}, {
  tableName: 'songgenres',
  timestamps: false
});

Song.hasOne(Artist, { foreignKey: 'artist_id' });
Song.hasMany(Genre, { foreignKey: 'genre_id' });
Song.hasOne(Language, { foreignKey: 'language_code' });
Song.hasOne(Metadata, { foreignKey: 'artist_id' });

module.exports = {
  Artist,
  Language,
  Metadata,
  Song,
  Genre
};
