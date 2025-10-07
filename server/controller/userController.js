const User = require("../model/userSchema");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnAuthenticatedError } = require("../errors/index");

const getUsers = async (req, res) => {
  const users = await User.find({});

  if (users.length < 1) {
    throw new BadRequestError("No users are currently registered");
  }

  res.status(StatusCodes.OK).json({
    users: { name: users.name, email: users.email },
    totalUsers: users.length,
  });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError(
      "Please name, email, and password field are required"
    );
  }

  // check if it's first user
  const firstUser = (await User.countDocuments({})) === 0;

  const user = await User.create({
    ...req.body,
    role: firstUser ? "admin" : "user",
  });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "user created",
    user: { name: user.name },
    token,
  });
};

const deleteUser = async (req, res) => {
  const { password } = req.body || {};
  const { id: userId } = req.params;
  const currentUser = req.user;

  // Only admin or owner can delete
  if (currentUser.userId !== userId && currentUser.role !== "admin") {
    throw new UnAuthenticatedError("Not authorized to delete this account");
  }

  // If not admin, owner must confirm password
  if (currentUser.role !== "admin") {
    if (!password) {
      throw new BadRequestError("Please provide your password");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new BadRequestError(`No user with id : ${userId}`);
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new BadRequestError("Invalid credentials");
    }
  }

  await User.findByIdAndDelete(userId);

  res.status(StatusCodes.OK).json({ msg: "user deleted ", success: true });
};

const updateUser = async (req, res) => {
  const { role } = req.body;
  const currentUser = req.user;
  const { id: userId } = req.params;
  const noFieldsToUpdate = !Object.keys(req.body).length;

  if (role && currentUser.role !== "admin") {
    throw new BadRequestError("Users are not allowed to change their role.");
  }

  if (noFieldsToUpdate) {
    throw new BadRequestError("Please provide at least one field to update.");
  }

  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new BadRequestError(`No user found with id: ${userId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ user, success: true, msg: "User details updated successfully." });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("Invalid credentials (email does not exist)");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Invalid credentials (wrong password)");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const forgottenPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("Please provide email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("invalid credentials (email does not exist)");
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Login successful", token, user: { name: user.name } });
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  forgottenPassword,
  login,
};
