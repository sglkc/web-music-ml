import { Sequelize, DataTypes } from 'sequelize';
import mysql2 from 'mysql2';

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'projekbasdat',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  dialect: 'mysql',
  dialectModule: mysql2,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
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
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
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

const Genre = sequelize.define('genres', {
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  subgenre_id: {
    type: DataTypes.INTEGER,
    /*
    references: {
      model: Genre,
      key: 'genre_id',
    }
    */
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
    primaryKey: true,
    references: {
      model: Song,
      key: 'song_id',
    }
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Genre,
      key: 'genre_id',
    }
  },
}, {
  tableName: 'songgenres',
  timestamps: false
});

const Song = sequelize.define('songs', {
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
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
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  tableName: 'songs'
});

Song.hasOne(Artist, { as: 'artist', foreignKey: 'artist_id' });
Song.belongsToMany(Genre, { through: SongGenres, foreignKey: 'song_id', otherKey: 'genre_id' });
Song.hasOne(Language, { foreignKey: 'language_code' });
Song.hasOne(Metadata, { as: 'metadata', foreignKey: 'metadata_id' });

export {
  Artist,
  Language,
  Metadata,
  Song,
  SongGenres,
  Genre
};
