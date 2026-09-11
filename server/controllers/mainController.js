exports.getStatus = (req, res) => {
  res.json({
    project: 'Hackout 2.0',
    status: 'active',
    message: 'Backend API is ready',
  });
};

exports.handleData = (req, res) => {
  const { data } = req.body;
  res.json({
    success: true,
    received: data || null,
  });
};
