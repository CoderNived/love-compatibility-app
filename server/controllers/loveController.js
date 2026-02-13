import Love from '../models/Love.js';

// Love Calculation Algorithm
const calculateLovePercentage = (name1, name2) => {
  // Combine and normalize names
  const combined = (name1 + name2).toLowerCase().replace(/\s+/g, '');
  
  // Sum ASCII values
  let asciiSum = 0;
  for (let i = 0; i < combined.length; i++) {
    asciiSum += combined.charCodeAt(i);
  }
  
  // Hash mixing for better distribution
  let hash = asciiSum;
  hash = ((hash << 5) - hash) + asciiSum;
  hash = hash & hash; // Convert to 32-bit integer
  
  // Get base percentage (0-100)
  let percentage = Math.abs(hash % 101);
  
  // Add playful randomness (±3)
  const randomness = Math.floor(Math.random() * 7) - 3; // -3 to +3
  percentage = Math.max(0, Math.min(100, percentage + randomness));
  
  return percentage;
};

// @desc    Calculate love compatibility and save
// @route   POST /api/love
// @access  Public
export const calculateLove = async (req, res, next) => {
  try {
    const { name1, name2 } = req.body;

    // Validation
    if (!name1 || !name2) {
      return res.status(400).json({
        success: false,
        error: 'Both names are required'
      });
    }

    if (name1.trim().length === 0 || name2.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Names cannot be empty'
      });
    }

    // Calculate percentage
    const percentage = calculateLovePercentage(name1.trim(), name2.trim());

    // Save to database
    const loveEntry = await Love.create({
      name1: name1.trim(),
      name2: name2.trim(),
      percentage
    });

    res.status(201).json({
      success: true,
      data: loveEntry
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get all love calculations
// @route   GET /api/love
// @access  Public (Admin)
export const getAllLoveEntries = async (req, res, next) => {
  try {
    const { limit = 100, page = 1 } = req.query;
    
    const entries = await Love.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Love.countDocuments();

    res.status(200).json({
      success: true,
      count: entries.length,
      total,
      data: entries
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get statistics and analytics
// @route   GET /api/love/stats
// @access  Public (Admin)
export const getLoveStats = async (req, res, next) => {
  try {
    // Total submissions
    const total = await Love.countDocuments();

    // Average percentage
    const avgResult = await Love.aggregate([
      {
        $group: {
          _id: null,
          avgPercentage: { $avg: '$percentage' }
        }
      }
    ]);
    const avgPercentage = avgResult.length > 0 ? avgResult[0].avgPercentage : 0;

    // Distribution by ranges
    const distribution = await Love.aggregate([
      {
        $bucket: {
          groupBy: '$percentage',
          boundaries: [0, 31, 61, 86, 101],
          default: 'Other',
          output: {
            count: { $sum: 1 },
            range: { $first: '$percentage' }
          }
        }
      }
    ]);

    // Top 10 highest scores
    const topScores = await Love.find()
      .sort({ percentage: -1 })
      .limit(10)
      .select('name1 name2 percentage createdAt');

    // Recent submissions (last 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await Love.countDocuments({
      createdAt: { $gte: twentyFourHoursAgo }
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        avgPercentage: Math.round(avgPercentage * 10) / 10,
        distribution,
        topScores,
        recentCount
      }
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Delete a love entry
// @route   DELETE /api/love/:id
// @access  Private (Admin)
export const deleteLoveEntry = async (req, res, next) => {
  try {
    const entry = await Love.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        error: 'Entry not found'
      });
    }

    await entry.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });

  } catch (error) {
    next(error);
  }
};
