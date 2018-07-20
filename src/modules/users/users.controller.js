import { Promise } from 'sequelize';
import models from '../../config/mysql';
import { URL_SERVER } from '../../utils/helper';
import { MailConfirmAccount, SendMailServer } from '../../config/mail';

const { Users } = models;

const verifiedAccount = (info) => {
  const { name, email, passClient } = info;
  return new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        reject(new Error('Name is required !'));
      } else if (!email) {
        reject(new Error('Email is required !'));
      } else if (!passClient) {
        reject(new Error('Password is required !'));
      }
      const user = await Users.create(info);
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};

export const signUp = async (req, res) => {
  try {
    const handleInfo = await verifiedAccount(req.body);
    const token = await Users.createToken(handleInfo);
    const userInfo = Users.getJSON(handleInfo);
    res.set('Access-Control-Expose-Headers', 'X-Authorization');
    res.set('X-Authorization', token);
    const templateMail = await MailConfirmAccount({
      ...userInfo,
      token,
      url: URL_SERVER(req, 'users/verified-email/'),
    });
    await SendMailServer(templateMail);
    return res.status(201).json({ ...userInfo, token });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const signIn = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const verifiedEmail = async (req, res) => {
  try {
    let success = false;
    const { token } = req.params;
    const verify = Users.verifyRefreshToken(token);
    const users = await Users.findById(verify.id);
    if (users) {
      success = true;
      await users.update({ verified: true });
    }
    return res.status(200).json({ success });
  } catch (err) {
    return res.status(400).json(err);
  }
};
