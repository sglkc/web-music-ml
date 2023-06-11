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

const Pengguna = sequelize.define('pengguna', {
  id_pengguna: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: {
      msg: 'username sudah dipakai'
    }
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  dibuat: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
  },
}, {
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  },
  timestamps: false,
  tableName: 'pengguna',
  createdAt: 'dibuat',
});

const Pos = sequelize.define('pos', {
  id_pos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_pengguna: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pengguna,
      key: 'id_pengguna',
    }
  },
  isi: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  dibuat: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
  },
}, {
  defaultScope: {
    attributes: {
      include: [
        [sequelize.col('pengguna.username'), 'username'],
        [sequelize.literal('(SELECT COUNT(*) FROM suka WHERE suka.id_pos = pos.id_pos)'), 'sukaCount'],
      ]
    },
    include: [
      {
        association: 'pengguna',
        attributes: []
      },
      'komentar'
    ],
  },
  scopes: {
    compact: {
      attributes: {
        include: [
          [sequelize.col('pengguna.username'), 'username'],
          [sequelize.literal('(SELECT COUNT(*) FROM suka WHERE suka.id_pos = pos.id_pos)'), 'sukaCount'],
          [sequelize.literal('(SELECT COUNT(*) FROM komentar WHERE komentar.id_pos = pos.id_pos)'), 'komentarCount'],
        ],
        exclude: ['id_pengguna']
      },
      include: [
        {
          association: 'pengguna',
          attributes: []
        },
      ],
    }
  },
  timestamps: false,
  tableName: 'pos',
  createdAt: 'dibuat'
});

const Suka = sequelize.define('suka', {
  id_pengguna: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Pengguna,
      key: 'id_pengguna',
    }
  },
  id_pos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Pos,
      key: 'id_pos'
    }
  },
}, {
  defaultScope: {
    attributes: {
      exclude: ['id_pos', 'id_pengguna']
    },
    include: {
      association: 'pengguna',
      attributes: ['username']
    }
  },
  timestamps: false,
  tableName: 'suka',
});

const Komentar = sequelize.define('komentar', {
  id_komentar: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_pengguna: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pengguna,
      key: 'id_pengguna',
    }
  },
  id_pos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pos,
      key: 'id_pos'
    }
  },
  isi: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  dibuat: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
  },
}, {
  defaultScope: {
    attributes: {
      exclude: ['id_pengguna', 'id_pos']
    },
    include: {
      association: 'pengguna',
      attributes: ['username']
    },
  },
  timestamps: false,
  tableName: 'komentar',
  createdAt: 'dibuat'
});

Pengguna.hasMany(Pos, { foreignKey: 'id_pengguna' });
Pos.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
Pos.hasMany(Suka, { as: 'suka', foreignKey: 'id_pos' });
Pos.hasMany(Komentar, { as: 'komentar', foreignKey: 'id_pos' });
Suka.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });
Komentar.belongsTo(Pengguna, { foreignKey: 'id_pengguna' });

module.exports = {
  Pengguna,
  Pos,
  Suka,
  Komentar
};
