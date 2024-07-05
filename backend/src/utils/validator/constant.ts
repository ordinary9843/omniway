import { body } from 'express-validator';

export const USERNAME_VALIDATION_RULES = body('username')
  .trim()
  .notEmpty()
  .withMessage('Username must be provided')
  .isLength({ min: 6 })
  .withMessage('Username must be at least 6 characters long')
  .matches(/^[a-zA-Z0-9.]+$/)
  .withMessage('Username must only contain letters, numbers, and dots')
  .escape();

export const PASSWORD_VALIDATION_RULES = body('password')
  .trim()
  .notEmpty()
  .withMessage('Password must be provided')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)
  .withMessage(
    'Password requires lowercase, uppercase, number, and special character.',
  )
  .escape();

export const CONFIRM_PASSWORD_VALIDATION_RULES = body('confirmPassword')
  .trim()
  .notEmpty()
  .custom((value, { req }) => {
    return value === req.body.password;
  })
  .escape()
  .withMessage('Passwords do not match');
