/**
 * Local Modules
 */
import { User } from '../user/user.model';
import { BloodRequest } from '../blood-request/blood-request.model';
import { REQUEST_STATUS } from '../blood-request/blood-request.interface';
import { BLOOD_GROUP, ROLE } from '../user/user.interface';

/**
 * Get Dashboard Analytics
 */
const getDashboardAnalytics = async () => {
    // Get start of today for daily statistics
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Parallel execution of all queries for better performance
    const [
        totalUsers,
        totalRequests,
        matchedRequests,
        fulfilledRequests,
        userBloodGroups,
        requestBloodGroups,
        todayStats,
    ] = await Promise.all([
        // Total users count (excluding deleted)
        User.countDocuments({
            isDeleted: false,
            isBlocked: false,
            role: ROLE.DONOR,
        }),

        // Total requests count
        BloodRequest.countDocuments(),

        // Matched requests count
        BloodRequest.countDocuments({ status: REQUEST_STATUS.MATCHED }),

        // Fulfilled requests count (completed)
        BloodRequest.countDocuments({ status: REQUEST_STATUS.COMPLETED }),

        // Users by blood group (excluding deleted users)
        User.aggregate([
            { $match: { isDeleted: false } },
            { $group: { _id: '$bloodGroup', count: { $sum: 1 } } },
            { $project: { bloodGroup: '$_id', count: 1, _id: 0 } },
            { $sort: { bloodGroup: 1 } },
        ]),

        // Requests by blood group
        BloodRequest.aggregate([
            { $group: { _id: '$bloodGroup', count: { $sum: 1 } } },
            { $project: { bloodGroup: '$_id', count: 1, _id: 0 } },
            { $sort: { bloodGroup: 1 } },
        ]),

        // Today's statistics
        BloodRequest.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfToday, $lte: endOfToday },
                },
            },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]),
    ]);

    // Process today's statistics
    const todayStatsMap = todayStats.reduce(
        (acc, stat) => {
            acc[stat._id] = stat.count;
            return acc;
        },
        {} as Record<string, number>,
    );

    // Ensure all blood groups are represented in the response
    const allBloodGroups = Object.values(BLOOD_GROUP);

    const userBloodGroupsComplete = allBloodGroups.map((bloodGroup) => {
        const found = userBloodGroups.find(
            (item) => item.bloodGroup === bloodGroup,
        );
        return { bloodGroup, count: found ? found.count : 0 };
    });

    const requestBloodGroupsComplete = allBloodGroups.map((bloodGroup) => {
        const found = requestBloodGroups.find(
            (item) => item.bloodGroup === bloodGroup,
        );
        return { bloodGroup, count: found ? found.count : 0 };
    });

    return {
        totals: {
            users: totalUsers,
            requests: totalRequests,
            matched: matchedRequests,
            fulfilled: fulfilledRequests,
        },
        bloodGroups: {
            users: userBloodGroupsComplete,
            requests: requestBloodGroupsComplete,
        },
        today: {
            requestsCreated: todayStatsMap[REQUEST_STATUS.PENDING] || 0,
            requestsMatched: todayStatsMap[REQUEST_STATUS.MATCHED] || 0,
            requestsFulfilled: todayStatsMap[REQUEST_STATUS.COMPLETED] || 0,
            requestsCancelled: todayStatsMap[REQUEST_STATUS.REJECTED] || 0,
        },
    };
};

/**
 * Export Service
 */
export const AdminService = {
    getDashboardAnalytics,
};
