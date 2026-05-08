const { createSchoolService, getSortedSchoolsListService } = require('../services/school.service');

const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || typeof name !== 'string' || typeof address !== 'string') {
            return res.status(400).json({ error: 'Name and Address are required and must be text.' });
        }

        if (latitude === undefined || longitude === undefined || typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ error: 'Latitude and Longitude are required and must be numbers.' });
        }

        const schoolId = await createSchoolService({ name, address, latitude, longitude });

        return res.status(201).json({
            message: 'School added successfully!',
            schoolId: schoolId
        });
    } catch (error) {
        console.error('Error adding school:', error);
        return res.status(500).json({ error: 'Internal server error while adding school.' });
    }
};

const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'User latitude and longitude are required.' });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: 'Latitude and Longitude must be valid numbers.' });
        }

        const sortedSchools = await getSortedSchoolsListService(userLat, userLon);

        return res.status(200).json(sortedSchools);
    } catch (error) {
        console.error('Error fetching schools:', error);
        return res.status(500).json({ error: 'Internal server error while fetching schools.' });
    }
};

module.exports = {
    addSchool,
    listSchools
};