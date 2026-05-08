const pool = require('../config/db');

// Haversine distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const R = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const createSchoolService = async (schoolData) => {
    const { name, address, latitude, longitude } = schoolData;
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(query, [name, address, latitude, longitude]);
    return result.insertId;
};

const getSortedSchoolsListService = async (userLat, userLon) => {
    const [schools] = await pool.query('SELECT * FROM schools');

    const sortedSchools = schools.map(school => {
        const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
        return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    return sortedSchools;
};

module.exports = {
    createSchoolService,
    getSortedSchoolsListService
};