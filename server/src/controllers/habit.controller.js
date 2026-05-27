export async function completeHabit(req, res) {
  const date = req.body.date || dayjs().format('YYYY-MM-DD');

  const habit = await Habit.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!habit) {
    throw new ApiError(404, 'Habit not found.');
  }

  const alreadyDone = habit.completions.some(
    (entry) => entry.date === date
  );

  if (alreadyDone) {
    throw new ApiError(409, 'Already completed for today.');
  }

  const yesterday = dayjs(date)
    .subtract(1, 'day')
    .format('YYYY-MM-DD');

  const lastDate =
    habit.completions.length > 0
      ? habit.completions[habit.completions.length - 1].date
      : null;

  const continues = lastDate === yesterday;

  habit.streak.current = continues
    ? habit.streak.current + 1
    : 1;

  habit.streak.longest = Math.max(
    habit.streak.longest,
    habit.streak.current
  );

  const streakBonus =
    habit.streak.current % 7 === 0 ? 30 : 0;

  const xpEarned =
    (habit.xpReward || 10) + streakBonus;

  habit.completions.push({
    date,
    xpEarned,
    note: req.body.note || ''
  });

  habit.streak.lastCompletedAt = dayjs(date).toDate();

  await habit.save();

  req.user.gamification.currentStreak = Math.max(
    req.user.gamification.currentStreak,
    habit.streak.current
  );

  req.user.gamification.longestStreak = Math.max(
    req.user.gamification.longestStreak,
    habit.streak.longest
  );

  await req.user.save();

  await AnalyticsSnapshot.findOneAndUpdate(
    { user: req.user._id, date },
    {
      $inc: { habitsCompleted: 1 },
      $set: {
        productivityScore: Math.min(
          100,
          20 + habit.streak.current * 4
        )
      }
    },
    { upsert: true }
  );

  const reward = await awardXp(
    req.user,
    xpEarned,
    'habit_completed'
  );

  return res.json({
    success: true,
    habit,
    reward
  });
}

export async function archiveHabit(req, res) {
  const habit = await Habit.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id
    },
    {
      archived: true
    },
    {
      new: true
    }
  );

  if (!habit) {
    throw new ApiError(404, 'Habit not found.');
  }

  res.json({ habit });
}

export async function deleteHabit(req, res) {
  const habit = await Habit.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!habit) {
    throw new ApiError(404, 'Habit not found');
  }

  res.json({
    success: true
  });
}