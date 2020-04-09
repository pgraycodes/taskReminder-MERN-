const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Reminder = require('../models/Reminder');

// @desc      Create new reminder
// @route     POST /api/v1/auth/id:/reminders
// @access    Private

exports.createReminder = asyncHandler(async (req, res, next) => {
  //add user to req.body leverage protect middleware
  req.body.user = req.user.id;

  const user = await User.findById(req.body.user);

  if (!user) {
    return next(
      new ErrorResponse(`No USER with the id of ${req.body.user}`, 404)
    );
  }

  const reminder = await Reminder.create(req.body);

  //Make sure user logged in is the  owner of reminder
  if (
    reminder.user.toString() !== req.user.id &&
    req.user.role !== 'SecretAgentAdmin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a reminder  `,
        401
      )
    );
  }

  user.reminders.push(reminder);
  await user.save();

  res.status(201).json({
    success: true,
    data: reminder,
  });
});

// @desc      get all users reminders
// @route     get /api/v1/auth/:id/reminders
// @access    Public

exports.getUserReminders = asyncHandler(async (req, res) => {
  let query;

  const { userId } = req.params;
  const user = await User.findById(userId);

  if (userId) {
    query = Reminder.find({ user: userId }, 'content');
  } else {
    query = Reminder.find();
  }
  const reminders = await query;

  res.status(200).json({
    success: true,
    count: reminders.length,
    data: reminders,
  });
});

// @desc      update reminders
// @route     get /api/v1/auth//reminders/:id
// @access    Private

exports.updateReminders = asyncHandler(async (req, res, next) => {
  let reminder = await Reminder.findById(req.params.id);

  if (!reminder) {
    return next(
      new ErrorResponse(`No reminder with id of ${req.params.id}`, 404)
    );
  }

  //Make sure user logged in is the  owner of reminder
  if (
    reminder.user.toString() !== req.user.id &&
    req.user.role !== 'SecretAgentAdmin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this reminder  `,
        401
      )
    );
  }

  reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: reminder,
  });
});

// @desc      delete reminders
// @route     delete /api/v1/auth//reminders/:id
// @access    Private

exports.deleteReminder = asyncHandler(async (req, res, next) => {
  const reminder = await Reminder.findById(req.params.id);

  if (!reminder) {
    return next(
      new ErrorResponse(`No reminder with id of ${req.params.id}`, 404)
    );
  }

  //Make sure user logged in is the  owner of reminder
  if (
    reminder.user.toString() !== req.user.id &&
    req.user.role !== 'SecretAgentAdmin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this reminder  `,
        401
      )
    );
  }
  await reminder.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
