const healthCheck = (req, res) => {
  res.json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  healthCheck,
};
