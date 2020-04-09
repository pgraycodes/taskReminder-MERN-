const express = require('express');
const {
  createReminder,
  getUserReminders,
  updateReminders,
  deleteReminder
  
 
} = require('../controllers/reminders');


const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .post(protect, createReminder)
  .get(getUserReminders);
  
  router
  .route('/:id')
  .put(updateReminders)
  .delete(deleteReminder);
  



module.exports = router;