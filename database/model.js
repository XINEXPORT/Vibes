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
        name: {
            type: DataTypes.STRING(25)
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
        name: {
            type: DataTypes.STRING(25)
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
        },
        speed: {
            type: DataTypes.FLOAT
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
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(25)
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

class UserSoundscape extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

UserSoundscape.init(
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

class FriendRequest extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

FriendRequest.init(
    {
        friendRequestId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        modelName: 'friendRequest',
        sequelize: db
    }
);

// Table Relations:
User.belongsToMany(User, {as: 'Friends', through: FriendsList, foreignKey: 'userId', otherKey: 'friendId'});

User.hasMany(FriendsList, {foreignKey: 'userId'});
FriendsList.belongsTo(User, {foreignKey: 'userId'});

User.belongsToMany(User, {as: 'Requests', through: FriendRequest, foreignKey: 'userId', otherKey: 'requesteeId'});

User.hasMany(FriendRequest, {foreignKey: 'userId'});
FriendRequest.belongsTo(User, {foreignKey: "userId"});

User.hasMany(Soundscape, {foreignKey: 'userId'});
Soundscape.belongsTo(User, {foreignKey: 'userId'});

Soundscape.belongsToMany(Sound, {through: SoundscapeSound, foreignKey: 'soundscapeId'});
Sound.belongsToMany(Soundscape, {through: SoundscapeSound, foreignKey: 'soundId', onDelete: 'CASCADE', hooks: true});

User.belongsToMany(Soundscape, {through: UserSoundscape, foreignKey: 'userId'});
Soundscape.belongsToMany(User, {through: UserSoundscape, foreignKey: 'soundscapeId'});

User.hasMany(Sound, {foreignKey: 'userId'});
Sound.belongsTo(User, {foreignKey: 'userId'});

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
    console.log('Syncing database...');
    await db.sync({force: true});
    console.log('Finished syncing database.');
};

export {
    db,
    User,
    FriendsList,
    FriendRequest,
    Soundscape,
    SoundscapeSound,
    MySound,
    Sound,
    UserSoundscape
};