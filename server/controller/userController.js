const User = require("../model/userSchema");

const { StatusCodes } = require("http-status-codes");

const { BadRequestsError, UnAuthenticatedError } = require("../errors/index");

const getUsers = async (req, res) => {
  const users = await User.find({});

  if (users.length < 1) {
    throw new BadRequestsError("No users are currently registered");
  }

  res.status(StatusCodes.OK).json({ users, totalUsers: users.length });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestsError(
      "Please name, email, and password field are required"
    );
  }

  const user = await User.create({ ...req.body });

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
      throw new BadRequestsError("Please provide your password");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new BadRequestsError(`No user with id : ${userId}`);
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new BadRequestsError("Invalid credentials");
    }
  }

  await User.findByIdAndDelete(userId);

  res.status(StatusCodes.OK).json({ msg: "user deleted ", success: true });
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOneAndDelete({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new BadRequestsError(`Please no user with such Id : ${userId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ user, success: true, msg: "user details updated successful" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestsError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestsError("Invalid credentials (email does not exist)");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new BadRequestsError("Invalid credentials (wrong password)");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  login,
};
