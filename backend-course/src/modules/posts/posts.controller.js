const { Op } = require('sequelize');
const models = require('../../config/mysql');
const { uploadFile, errorUpload } = require('../../utils/upload');

const { Posts, Users } = models;

const addPosts = async (req, res) => {
  try {
    uploadFile(req, res, async (err) => {
      await errorUpload(err);
      const dataProduct = req.body;
      dataProduct.images = null;
      if (req.file) {
        dataProduct.images = req.file.filename;
      }
      await Posts.create(dataProduct);
      return res.status(200).json({ success: true });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getPosts = async (req, res) => {
  try {
    const listPosts = await Posts.findAll({
      limit: 10,
      order: [
        ['id', 'DESC'],
      ],
      include: [{
        model: Users,
        required: false,
        where: { id: { [Op.gt]: 1 } },
      }],
    });
    return res.status(200).json(listPosts);
  } catch (err) {
    return res.status(400).json({ error: String(err) });
  }
};

const getPost = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Posts.findOne({ where: { slug } });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const editPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const editProduct = await Posts.findById(id);
    Object.keys(req.body).forEach((key) => {
      editProduct[key] = req.body[key];
    });
    return res.status(200).json(await editProduct.save());
  } catch (err) {
    return res.status(400).json(err);
  }
};

const removePosts = async (req, res) => {
  try {
    const { id } = req.params;
    await Posts.destroy({ where: { id } });
    return res.status(200).json({ status: 'successful' });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  addPosts,
  getPosts,
  getPost,
  editPosts,
  removePosts,
};
