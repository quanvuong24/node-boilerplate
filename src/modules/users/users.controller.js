import models from '../../config/mysql';

const Users = models.Users;

export const signUp = async (req, res) => {
    try {
        const dataUser = req.body;
        await Users.create(dataUser);
        return res.status(200).json({success: true});
    } catch (err) {
        res.status(400).json(err);
    };
};

export const signIn = async (req, res) => {

};

export const verifiedEmail = async (req, res) => {

};

export const refreshToken = async (req, res) => {

};

export const resetPassword = async (req, res) => {

};

export const updatePassword = async (req, res) => {

};

export const editProfile = async (req, res) => {

};

// export const removeUser = async (req, res) => {
// };

