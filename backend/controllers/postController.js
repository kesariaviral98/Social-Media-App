const { Post, User } = require('../models');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['id', 'DESC']]
    });
    const formatted = posts.map(post => ({
      id: post.id,
      user_id: post.userId,
      username: post.User?.username,
      content: post.content
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

exports.createPost = async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.create({ userId: req.user.id, content });
    res.json({ id: post.id, content: post.content, user_id: req.user.id, username: req.user.username });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

exports.updatePost = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  try {
    const [updated] = await Post.update(
      { content },
      { where: { id: postId, userId: req.user.id } }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await Post.destroy({ where: { id: postId, userId: req.user.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};
