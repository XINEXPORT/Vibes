import { DataTypes, Model } from "sequelize";
import url from "url";
import util from 'util';
import connectToDB from "./db.js";

const db = await connectToDB(`postgresql:///vibes`);

// Table initializations:
class User extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        modelName: 'user',
        sequelize: db
    }
);

class Sound extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Sound.init(
    {
        soundId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        sound: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(25)
        }
    },
    {
        modelName: 'sound',
        sequelize: db
    }
);

class Soundscape extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Soundscape.init(
    {
        soundscapeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        isPrivate: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        modelName: 'soundscape',
        sequelize: db
    }
);

class SoundscapeSound extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

SoundscapeSound.init(
    {
        sssId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        volume: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName: 'soundscapeSound',
        sequelize: db
    }
)

class MySound extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

MySound.init(
    {
        mySoundId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        sound: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(25)
        }
    },
    {
        modelName: 'mySound',
        sequelize: db
    }
);

class MyFavoriteSoundscape extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

MyFavoriteSoundscape.init(
    {
        favoriteId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        modelName: 'myFavoriteSoundscape',
        sequelize: db
    }
);

class FriendsList extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

FriendsList.init(
    {
        friendsListId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        modelName: 'friendsList',
        sequelize: db
    }
);

// Table Relations:
User.belongsToMany(User, {as: 'me', through: FriendsList, foreignKey: 'userId'});
User.belongsToMany(User, {as: 'friend', through: FriendsList, foreignKey: 'friendId', onDelete: 'CASCADE', hooks: true});

User.belongsToMany(Soundscape, {through: MyFavoriteSoundscape, foreignKey: 'userId'});
Soundscape.belongsToMany(User, {through: MyFavoriteSoundscape, foreignKey: 'soundscapeId', onDelete: 'CASCADE', hooks: true});

User.hasMany(Soundscape, {foreignKey: 'userId'});
Soundscape.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Sound, {foreignKey: 'userId'});
Sound.belongsTo(User, {foreignKey: 'userId'});

Soundscape.belongsToMany(Sound, {through: SoundscapeSound, foreignKey: 'soundscapeId'});
Sound.belongsToMany(Soundscape, {through: SoundscapeSound, foreignKey: 'soundId', onDelete: 'CASCADE', hooks: true});

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
    console.log('Syncing database...');
    await db.sync({force: true});
    console.log('Finished syncing database.');
};

export {
    db,
    User,
    FriendsList,
    Soundscape,
    SoundscapeSound,
    MySound,
    Sound,
    MyFavoriteSoundscape
};