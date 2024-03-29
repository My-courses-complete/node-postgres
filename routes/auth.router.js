const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.service');

const service = new AuthService()
const router = express.Router();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      res.json(service.signToken(req.user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const message = await service.sendRecovery(email);
      res.json(message);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const message = await service.changePassword(token, password);
      res.json(message);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;