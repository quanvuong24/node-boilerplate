import { hashSync, compareSync } from 'bcrypt-nodejs';
import { verify, sign } from 'jsonwebtoken';
import { constants } from '../../config/constants';

const UserModel = (sequelize, DataTypes) => {
  const Users = sequelize.define('user', {
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is field required !',
        },
        checkName(value) {
          const Regex = /^(?!.*[!@#$%^&*()_+=])(?!.*[0-9])[a-zA-Z].{3,30}$/g;
          if (!Regex.test(value)) {
            throw new Error('Name is not match !');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: { msg: 'Email address already in taken !' },
      validate: {
        notEmpty: true,
        isEmail: true,
        max: 120,
        min: 8,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passClient: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      set(val) {
        this.setDataValue('passClient', val);
        this.setDataValue('password', hashSync(val));
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is field required !',
        },
        isLongEnough(val) {
          if (`${val}`.length < 5) {
            throw new Error('Please choose a longer password');
          }
        },
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(),
      allowNull: true,
      defaultValue: 'Remy.jpg',
      validate: {
        checkImage(img) {
          if (!img.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
            throw new Error('Image is not match !');
          }
        },
      },
    },
    intro: {
      type: DataTypes.TEXT('tiny'),
      allowNull: true,
    },
  }, {
    timestamps: true,
  });

  Users.associate = (models) => {
    models.Users.hasMany(models.Posts);
  };

  Users.comparePassword = (passNew, passOld) => (compareSync(passNew, passOld));

  Users.createAcToken = ({ id }) => (
    sign(
      { id },
      constants.JWT_SECRET,
      { expiresIn: constants.EXP_TOKEN_ACCESS, algorithm: 'HS384' },
    )
  );

  Users.createToken = async ({ id }) => {
    const accessToken = await Users.createAcToken({ id });
    return accessToken;
  };

  Users.verifyAccessToken = (token) => (
    verify(token, constants.JWT_SECRET, (err, decoded) => {
      if (err) throw err;
      return decoded;
    })
  );

  Users.getJSON = ({ id, name, email, intro, avatar, created_at, updated_at }) => (
    { id, name, email, intro, avatar, created_at, updated_at }
  );

  return Users;
};

export default UserModel;
