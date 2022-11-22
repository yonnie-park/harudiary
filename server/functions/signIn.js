const { userSignIn } = require('../../data/prisma/scripts/user');

const signIn = async (req, res) => {
  const data = req.body;
  const dataKeys = Object.keys(data);
  if (
    dataKeys.length != 2 ||
    !dataKeys.includes('username') ||
    !dataKeys.includes('password') ||
    !data
  ) {
    console.log(`[SignIn Failed] Invalid Request`);
    res.status(400).json({ status: 'failed', content: 'Invalid Request' });
    return;
  }
  const signInUser = await userSignIn(data);
  if (!signInUser) {
    console.log(`[SignIn Failed] User doesn't Exist`);
    res.status(400).json({ status: 'failed', content: 'No matched user' });
    return;
  } else {
    console.log(
      `[SignIn Success] userId : ${signInUser.id}, username : ${signInUser.username}`
    );
    res.status(200).json({
      status: 'success',
      content: {
        userId: signInUser.id,
      },
    });
  }
};

module.exports = {
  signIn,
};
